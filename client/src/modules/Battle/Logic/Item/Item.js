var Item = cc.Sprite.extend({

    ctor: function (itemType) {
        this._super("res/item/item" + itemType + ".png");

        let bubble = new cc.Sprite("res/item/bubble.png")
        bubble.setPosition(cc.p(this.width / 2, this.height / 2))
        this.addChild(bubble)

        this.showIdleAnim()
    },

    showIdleAnim: function () {
        this.runAction(
            cc.sequence(
                cc.moveBy(0.7, 0, 5),
                cc.moveBy(0.7, 0, -5)
            ).repeatForever()
        )
    }
});
