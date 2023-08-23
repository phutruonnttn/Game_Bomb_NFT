var gv = gv || {};

cc.game.onStart = function () {

    if (!cc.sys.isNative && document.getElementById("cocosLoading")) //If referenced loading.js, please remove it
        document.body.removeChild(document.getElementById("cocosLoading"));

    // Pass true to enable retina display, disabled by default to improve performance
    cc.view.enableRetina(true);

    // Adjust viewport meta
    cc.view.adjustViewPort(true);
    jsb.fileUtils.addSearchPath(fr.NativeService.getFolderUpdateAssets(), true);
    jsb.fileUtils.addSearchPath(fr.NativeService.getFolderUpdateAssets() + "/res", true);
    cc.loader.resPath = "res";

    cc.LoaderScene.preload(g_resources, function () {
        //hide fps
        cc.director.setDisplayStats(true);

        DESIGN_RESOLUTION_WIDTH = SCREEN.RESOLUTION.WIDTH;
        DESIGN_RESOLUTION_HEIGHT = SCREEN.RESOLUTION.HEIGHT;
        cc.view.setDesignResolutionSize(DESIGN_RESOLUTION_WIDTH,DESIGN_RESOLUTION_HEIGHT, cc.ResolutionPolicy.SHOW_ALL);

        //socket
        gv.gameClient = new GameClient();
        gv.poolObjects = new PoolObject();

        //modules
        networkManager.connector = new networkManager.Connector(gv.gameClient);

        new User()

        fr.view(LoginScreen, 0);

        // // TEST =======================
        // let scene = new cc.Scene();
        // scene.addChild(new GameScene(
        //     [-1,2,3,4],
        //     ["acsdvdsv", "sdva", "asdss", "sdfsdggsda"],
        //     [1,2,3,4],
        //     [3,0,1,2],
        //     MAP.SIZE,
        //     MAP.MATRIX_MAP,
        //     2
        // ));
        // cc.director.runScene(new cc.TransitionFade(0, scene));
        // //=====================
    }, this);
};

cc.game.run();