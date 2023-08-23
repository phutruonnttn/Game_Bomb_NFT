<GameFile>
  <PropertyGroup Name="LoginGUI" Type="Scene" ID="f940e032-d161-4f6e-a808-85106dd28b5a" Version="3.10.0.0" />
  <Content ctype="GameProjectContent">
    <Content>
      <Animation Duration="0" Speed="1.0000" />
      <ObjectData Name="Scene" Tag="3" ctype="GameNodeObjectData">
        <Size X="1280.0000" Y="720.0000" />
        <Children>
          <AbstractNodeData Name="bg" ActionTag="-289199684" Tag="5" IconVisible="False" PercentWidthEnable="True" PercentHeightEnable="True" PercentWidthEnabled="True" PercentHeightEnabled="True" TouchEnable="True" ClipAble="False" BackColorAlpha="102" ColorAngle="90.0000" Scale9Enable="True" LeftEage="5" RightEage="5" TopEage="5" BottomEage="5" Scale9OriginX="5" Scale9OriginY="5" Scale9Width="1910" Scale9Height="1070" ctype="PanelObjectData">
            <Size X="1280.0000" Y="720.0000" />
            <Children>
              <AbstractNodeData Name="name" ActionTag="962227059" Tag="8" RotationSkewX="-8.1284" RotationSkewY="-8.1336" IconVisible="False" LeftMargin="70.6570" RightMargin="421.3430" TopMargin="98.5679" BottomMargin="479.4321" FontSize="100" LabelText="BoomBlock" OutlineSize="3" OutlineEnabled="True" ShadowOffsetX="20.0000" ShadowOffsetY="13.0000" ShadowEnabled="True" ctype="TextObjectData">
                <Size X="788.0000" Y="142.0000" />
                <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                <Position X="464.6570" Y="550.4321" />
                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                <CColor A="255" R="255" G="255" B="255" />
                <PrePosition X="0.3630" Y="0.7645" />
                <PreSize X="0.6156" Y="0.1972" />
                <FontResource Type="Normal" Path="font/SVN-Supercell Magic.ttf" Plist="" />
                <OutlineColor A="255" R="255" G="0" B="0" />
                <ShadowColor A="255" R="214" G="94" B="94" />
              </AbstractNodeData>
              <AbstractNodeData Name="btnLogin" ActionTag="-530980656" Tag="7" IconVisible="False" HorizontalEdge="BothEdge" VerticalEdge="BothEdge" LeftMargin="216.1960" RightMargin="828.8040" TopMargin="549.4440" BottomMargin="59.5560" TouchEnable="True" FontSize="14" Scale9Enable="True" LeftEage="15" RightEage="15" TopEage="11" BottomEage="11" Scale9OriginX="15" Scale9OriginY="11" Scale9Width="164" Scale9Height="89" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="ButtonObjectData">
                <Size X="235.0000" Y="111.0000" />
                <Children>
                  <AbstractNodeData Name="txt" ActionTag="-2034299605" Tag="9" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="48.0000" RightMargin="48.0000" TopMargin="31.0000" BottomMargin="31.0000" FontSize="36" LabelText="Login" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="TextObjectData">
                    <Size X="139.0000" Y="49.0000" />
                    <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                    <Position X="117.5000" Y="55.5000" />
                    <Scale ScaleX="1.0000" ScaleY="1.0000" />
                    <CColor A="255" R="255" G="255" B="255" />
                    <PrePosition X="0.5000" Y="0.5000" />
                    <PreSize X="0.5915" Y="0.4414" />
                    <FontResource Type="Normal" Path="font/SVN-Supercell Magic.ttf" Plist="" />
                    <OutlineColor A="255" R="255" G="0" B="0" />
                    <ShadowColor A="255" R="110" G="110" B="110" />
                  </AbstractNodeData>
                </Children>
                <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                <Position X="333.6960" Y="115.0560" />
                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                <CColor A="255" R="255" G="255" B="255" />
                <PrePosition X="0.2607" Y="0.1598" />
                <PreSize X="0.1836" Y="0.1542" />
                <TextColor A="255" R="65" G="65" B="70" />
                <DisabledFileData Type="Normal" Path="login/common_btn_orange.png" Plist="" />
                <PressedFileData Type="Normal" Path="login/common_btn_orange.png" Plist="" />
                <NormalFileData Type="Normal" Path="login/common_btn_orange.png" Plist="" />
                <OutlineColor A="255" R="255" G="0" B="0" />
                <ShadowColor A="255" R="110" G="110" B="110" />
              </AbstractNodeData>
              <AbstractNodeData Name="bgTextField" ActionTag="-689656132" Tag="8" IconVisible="False" HorizontalEdge="BothEdge" VerticalEdge="BothEdge" LeftMargin="173.6960" RightMargin="786.3040" TopMargin="445.7720" BottomMargin="215.2280" Scale9Enable="True" LeftEage="76" RightEage="76" TopEage="16" BottomEage="16" Scale9OriginX="76" Scale9OriginY="16" Scale9Width="8" Scale9Height="13" ctype="ImageViewObjectData">
                <Size X="320.0000" Y="59.0000" />
                <Children>
                  <AbstractNodeData Name="userIdTxt" ActionTag="1721171157" Tag="6" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="18.6400" RightMargin="16.3600" TopMargin="1.3552" BottomMargin="3.6448" TouchEnable="True" FontSize="36" IsCustomSize="True" LabelText="" PlaceHolderText="User ID" MaxLengthText="10" ctype="TextFieldObjectData">
                    <Size X="285.0000" Y="54.0000" />
                    <AnchorPoint ScaleX="0.4960" ScaleY="0.4788" />
                    <Position X="160.0000" Y="29.5000" />
                    <Scale ScaleX="1.0000" ScaleY="1.0000" />
                    <CColor A="255" R="255" G="255" B="255" />
                    <PrePosition X="0.5000" Y="0.5000" />
                    <PreSize X="0.8906" Y="0.9153" />
                    <FontResource Type="Normal" Path="font/SVN-Avo bold.ttf" Plist="" />
                  </AbstractNodeData>
                </Children>
                <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                <Position X="333.6960" Y="244.7280" />
                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                <CColor A="255" R="255" G="255" B="255" />
                <PrePosition X="0.2607" Y="0.3399" />
                <PreSize X="0.2500" Y="0.0819" />
                <FileData Type="Normal" Path="login/lobby_card_panel_box.png" Plist="" />
              </AbstractNodeData>
              <AbstractNodeData Name="notifyLabel" ActionTag="-52019712" Tag="7" IconVisible="False" HorizontalEdge="BothEdge" VerticalEdge="BothEdge" LeftMargin="175.3920" RightMargin="504.6080" TopMargin="385.4440" BottomMargin="291.5560" IsCustomSize="True" FontSize="28" LabelText="UserID can only contain digits!" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="TextObjectData">
                <Size X="600.0000" Y="43.0000" />
                <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                <Position X="475.3920" Y="313.0560" />
                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                <CColor A="255" R="255" G="46" B="46" />
                <PrePosition X="0.3714" Y="0.4348" />
                <PreSize X="0.4688" Y="0.0597" />
                <FontResource Type="Normal" Path="font/SVN-Avo bold.ttf" Plist="" />
                <OutlineColor A="255" R="255" G="0" B="0" />
                <ShadowColor A="255" R="110" G="110" B="110" />
              </AbstractNodeData>
            </Children>
            <AnchorPoint />
            <Position />
            <Scale ScaleX="1.0000" ScaleY="1.0000" />
            <CColor A="255" R="255" G="255" B="255" />
            <PrePosition />
            <PreSize X="1.0000" Y="1.0000" />
            <FileData Type="Normal" Path="login/BgLogin.png" Plist="" />
            <SingleColor A="255" R="150" G="200" B="255" />
            <FirstColor A="255" R="150" G="200" B="255" />
            <EndColor A="255" R="255" G="255" B="255" />
            <ColorVector ScaleY="1.0000" />
          </AbstractNodeData>
        </Children>
      </ObjectData>
    </Content>
  </Content>
</GameFile>