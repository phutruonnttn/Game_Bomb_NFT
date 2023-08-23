package cmd;


public class CmdDefine {

    // Lobby
    public static final short CUSTOM_LOGIN = 1;

    public static final short GET_USER_INFO = 1000;
    public static final short CHANGE_SKIN = 1001;
    public static final short BUY_SKIN = 1002;

    // Matching
    public static final short MATCHING = 3000;
    public static final short CANCEL_MATCHING = 3001;

    // Battle
    public static final short LOOP_MAX = 4000;
    public static final short MOVE = 4001;
    public static final short ATTACK = 4002;
    public static final short GET_ITEM = 4003;
    public static final short END_BATTLE = 4004;
}
