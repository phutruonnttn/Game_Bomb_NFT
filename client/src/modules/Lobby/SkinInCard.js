
var SkinInCard = AnimatedSprite.extend({

    ctor: function(idSkin, idAnim, order) {
        this._super("res/knight_f_run_anim_f0.png");

        this.setAnchorPoint(0.5,0.3)
        this.initAnimation(idSkin, idAnim, order)
    },

    initAnimation: function (id, idAnim, order) {
        const duration = 0.6
        this.load("res/skin/skin" + id + "_" + order +".plist", "skin_" + id + "_" + order +"_idle_%01d.png", 0, 3, duration)
        this.load( "res/skin/skin" + id + "_" + order +".plist", "skin_" + id + "_" + order +"_run_%01d.png", 0, 3, duration)
        this.load("res/skin/skin" + id + "_" + order +".plist", "skin_" + id + "_" + order +"_idle_%01d.png", 0, 0, duration)

        this.play(idAnim)
    }
});

SkinInCard.IDLE_ANIM = 0;
SkinInCard.RUN_ANIM = 1;
SkinInCard.STATIC_ANIM = 2;