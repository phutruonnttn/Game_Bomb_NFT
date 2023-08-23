var Joystick = cc.Sprite.extend({

    ctor: function() {
        this._super("res/cirBack.png");

        this.setScale(Joystick.SCALE)
        this.radius = this.width / 2;
        this.direction = cc.p(0, 0);
        this.touchId = null;

        this.stick = new cc.Sprite("res/cirInside.png");
        this.pos = cc.p(this.width / 2, this.height / 2)
        this.stick.setPosition(this.pos)
        this.stick.setScale(0.5)
        this.addChild(this.stick);

        this.setCascadeOpacityEnabled(true)
        this.setOpacity(100)

        cc.eventManager.addListener({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            onTouchBegan: this.onTouchBegan.bind(this),
            onTouchMoved: this.onTouchMoved.bind(this),
            onTouchEnded: this.onTouchEnded.bind(this),
            onTouchCancelled: this.onTouchCancelled.bind(this)
        }, this);
    },

    onTouchBegan: function(touch, event) {
        let touchPos = touch.getLocation();
        if (cc.pDistance(touchPos, this.getPosition()) <= this.radius) {
            this.touchId = touch.getID();
            return true;
        }
        return false;
    },

    onTouchMoved: function(touch, event) {
        if (touch.getID() === this.touchId) {
            let touchPos = touch.getLocation();
            let angle = cc.pToAngle(cc.pSub(touchPos, this.getPosition()));
            let angleDegrees = cc.radiansToDegrees(angle);

            // Chia 360 độ thành 8 phần bằng nhau
            let angleStep = 360 / 8;

            // Tính toán hướng gần nhất
            let roundedAngle = Math.round(angleDegrees / angleStep) * angleStep;

            // Chuyển góc từ độ sang radian
            let roundedAngleRadians = cc.degreesToRadians(roundedAngle);

            // Tạo vector hướng từ góc đã làm tròn
            let dir = cc.p(Math.cos(roundedAngleRadians), Math.sin(roundedAngleRadians));
            this.direction = dir

            let mul = Math.min(1, cc.pDistance(touchPos, this.getPosition()) / this.radius / Joystick.SCALE);

            // Update UI
            let additionPos = cc.pMult(cc.pMult(dir, mul), this.radius);
            this.stick.setPosition(cc.pAdd(this.pos, additionPos));
        }
    },

    onTouchEnded: function(touch, event) {
        if (touch.getID() === this.touchId) {
            this.direction = cc.p(0, 0);
            this.stick.setPosition(this.pos)
            this.touchId = null;
        }
    },

    onTouchCancelled: function(touch, event) {
        this.onTouchEnded(touch, event);
    }
});

Joystick.SCALE = 1