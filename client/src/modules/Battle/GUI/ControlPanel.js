var ControlPanel = cc.Layer.extend({

    ctor: function (gameScene) {
        this._super();

        this.gameScene = gameScene

        // Add joystick
        this.joystick = new Joystick();
        this.joystick.setPosition(this.joystick.radius + 70, this.joystick.radius + 70);
        this.addChild(this.joystick);

        // Add attack btn
        this.initAttackBtn();
    },

    initAttackBtn: function() {
        this.btnAttack = new ccui.Button("res/btnAttack.png");
        this.btnAttack.setPosition(cc.winSize.width - 80, this.joystick.width / 2 + 70);
        this.btnAttack.setOpacity(100)
        this.addChild(this.btnAttack)

        let self = this
        this.btnAttack.addTouchEventListener(function(sender, eventType) {
            if (eventType === ccui.Widget.TOUCH_BEGAN) {
                self.gameScene.sendRequestPlayerAttack()
            } else if (eventType === ccui.Widget.TOUCH_MOVED) {
                // Xử lý sự kiện khi người dùng di chuyển vị trí giữ button
            } else if (eventType === ccui.Widget.TOUCH_ENDED) {
                // Xử lý sự kiện khi người dùng nhả button
            }
        });

    },
});
