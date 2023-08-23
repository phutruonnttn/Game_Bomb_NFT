<GameFile>
  <PropertyGroup Name="LobbyGUI" Type="Scene" ID="5917d38c-c349-4a68-808b-fc07832dfbc5" Version="3.10.0.0" />
  <Content ctype="GameProjectContent">
    <Content>
      <Animation Duration="0" Speed="1.0000" />
      <ObjectData Name="Scene" Tag="9" ctype="GameNodeObjectData">
        <Size X="1280.0000" Y="720.0000" />
        <Children>
          <AbstractNodeData Name="bg" CanEdit="False" ActionTag="-213930013" Tag="10" IconVisible="False" PercentWidthEnable="True" PercentHeightEnable="True" PercentWidthEnabled="True" PercentHeightEnabled="True" TouchEnable="True" ClipAble="False" BackColorAlpha="102" ColorAngle="90.0000" Scale9Enable="True" LeftEage="5" RightEage="5" TopEage="5" BottomEage="5" Scale9OriginX="5" Scale9OriginY="5" Scale9Width="2378" Scale9Height="1658" ctype="PanelObjectData">
            <Size X="1280.0000" Y="720.0000" />
            <Children>
              <AbstractNodeData Name="btnCancelFindMatch" ActionTag="675443760" Tag="49" IconVisible="False" LeftMargin="921.6034" RightMargin="117.3966" TopMargin="464.0872" BottomMargin="170.9128" TouchEnable="True" FontSize="14" Scale9Enable="True" LeftEage="15" RightEage="15" TopEage="11" BottomEage="11" Scale9OriginX="15" Scale9OriginY="11" Scale9Width="164" Scale9Height="89" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="ButtonObjectData">
                <Size X="241.0000" Y="85.0000" />
                <Children>
                  <AbstractNodeData Name="txt" ActionTag="-985129032" Tag="50" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="55.0000" RightMargin="55.0000" TopMargin="21.1710" BottomMargin="25.8290" FontSize="28" LabelText="Cancel" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="TextObjectData">
                    <Size X="131.0000" Y="38.0000" />
                    <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                    <Position X="120.5000" Y="44.8290" />
                    <Scale ScaleX="1.0000" ScaleY="1.0000" />
                    <CColor A="255" R="255" G="255" B="255" />
                    <PrePosition X="0.5000" Y="0.5274" />
                    <PreSize X="0.5436" Y="0.4471" />
                    <FontResource Type="Normal" Path="font/SVN-Supercell Magic.ttf" Plist="" />
                    <OutlineColor A="255" R="255" G="0" B="0" />
                    <ShadowColor A="255" R="110" G="110" B="110" />
                  </AbstractNodeData>
                </Children>
                <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                <Position X="1042.1034" Y="213.4128" />
                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                <CColor A="255" R="255" G="255" B="255" />
                <PrePosition X="0.8141" Y="0.2964" />
                <PreSize X="0.1883" Y="0.1181" />
                <TextColor A="255" R="65" G="65" B="70" />
                <DisabledFileData Type="Normal" Path="common/common_btn_red.png" Plist="" />
                <PressedFileData Type="Normal" Path="common/common_btn_red.png" Plist="" />
                <NormalFileData Type="Normal" Path="common/common_btn_red.png" Plist="" />
                <OutlineColor A="255" R="255" G="0" B="0" />
                <ShadowColor A="255" R="110" G="110" B="110" />
              </AbstractNodeData>
              <AbstractNodeData Name="notEnoughTokenTxt" ActionTag="36472478" Tag="47" IconVisible="False" LeftMargin="849.6525" RightMargin="44.3475" TopMargin="550.0017" BottomMargin="89.9983" IsCustomSize="True" FontSize="20" LabelText="Not enough tokens!" HorizontalAlignmentType="HT_Center" VerticalAlignmentType="VT_Center" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="TextObjectData">
                <Size X="386.0000" Y="80.0000" />
                <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                <Position X="1042.6525" Y="129.9983" />
                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                <CColor A="255" R="255" G="0" B="0" />
                <PrePosition X="0.8146" Y="0.1806" />
                <PreSize X="0.3016" Y="0.1111" />
                <FontResource Type="Normal" Path="font/SVN-Supercell Magic.ttf" Plist="" />
                <OutlineColor A="255" R="255" G="0" B="0" />
                <ShadowColor A="255" R="110" G="110" B="110" />
              </AbstractNodeData>
              <AbstractNodeData Name="nodeAnimFindMatch" ActionTag="-1479366995" Tag="29" IconVisible="True" LeftMargin="1026.7711" RightMargin="253.2289" TopMargin="280.8652" BottomMargin="439.1348" ctype="SingleNodeObjectData">
                <Size X="0.0000" Y="0.0000" />
                <AnchorPoint />
                <Position X="1026.7711" Y="439.1348" />
                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                <CColor A="255" R="255" G="255" B="255" />
                <PrePosition X="0.8022" Y="0.6099" />
                <PreSize X="0.0000" Y="0.0000" />
              </AbstractNodeData>
              <AbstractNodeData Name="bgName" ActionTag="1904030891" Tag="22" IconVisible="False" LeftMargin="76.2970" RightMargin="943.7030" TopMargin="642.4904" BottomMargin="37.5096" LeftEage="46" RightEage="46" TopEage="13" BottomEage="13" Scale9OriginX="46" Scale9OriginY="13" Scale9Width="48" Scale9Height="14" ctype="ImageViewObjectData">
                <Size X="260.0000" Y="40.0000" />
                <Children>
                  <AbstractNodeData Name="txtName" ActionTag="1129775800" Tag="25" IconVisible="False" LeftMargin="28.0453" RightMargin="27.9547" TopMargin="3.6758" BottomMargin="9.3242" FontSize="20" LabelText="0x37f8...D302" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="TextObjectData">
                    <Size X="204.0000" Y="27.0000" />
                    <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                    <Position X="130.0453" Y="22.8242" />
                    <Scale ScaleX="1.0000" ScaleY="1.0000" />
                    <CColor A="255" R="255" G="255" B="255" />
                    <PrePosition X="0.5002" Y="0.5706" />
                    <PreSize X="0.7846" Y="0.6750" />
                    <FontResource Type="Normal" Path="font/SVN-Supercell Magic.ttf" Plist="" />
                    <OutlineColor A="255" R="255" G="0" B="0" />
                    <ShadowColor A="255" R="110" G="110" B="110" />
                  </AbstractNodeData>
                  <AbstractNodeData Name="avt" ActionTag="-840848742" Tag="24" IconVisible="False" LeftMargin="-24.4201" RightMargin="247.4201" TopMargin="2.2677" BottomMargin="0.7323" LeftEage="12" RightEage="12" TopEage="12" BottomEage="12" Scale9OriginX="12" Scale9OriginY="12" Scale9Width="13" Scale9Height="13" ctype="ImageViewObjectData">
                    <Size X="37.0000" Y="37.0000" />
                    <Children>
                      <AbstractNodeData Name="avtBorder" ActionTag="-142557439" Tag="23" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="-49.0000" RightMargin="-49.0000" TopMargin="-54.5000" BottomMargin="-54.5000" LeftEage="44" RightEage="44" TopEage="48" BottomEage="48" Scale9OriginX="44" Scale9OriginY="48" Scale9Width="47" Scale9Height="50" ctype="ImageViewObjectData">
                        <Size X="135.0000" Y="146.0000" />
                        <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                        <Position X="18.5000" Y="18.5000" />
                        <Scale ScaleX="0.3100" ScaleY="0.3100" />
                        <CColor A="255" R="255" G="255" B="255" />
                        <PrePosition X="0.5000" Y="0.5000" />
                        <PreSize X="3.6486" Y="3.9459" />
                        <FileData Type="Normal" Path="common/common_avatar_border.png" Plist="" />
                      </AbstractNodeData>
                    </Children>
                    <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                    <Position X="-5.9201" Y="19.2323" />
                    <Scale ScaleX="1.0000" ScaleY="1.0000" />
                    <CColor A="255" R="255" G="255" B="255" />
                    <PrePosition X="-0.0228" Y="0.4808" />
                    <PreSize X="0.1423" Y="0.9250" />
                    <FileData Type="Normal" Path="common/common_avatar.png" Plist="" />
                  </AbstractNodeData>
                </Children>
                <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                <Position X="206.2970" Y="57.5096" />
                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                <CColor A="255" R="255" G="255" B="255" />
                <PrePosition X="0.1612" Y="0.0799" />
                <PreSize X="0.2031" Y="0.0556" />
                <FileData Type="Normal" Path="lobby/lobby_box.png" Plist="" />
              </AbstractNodeData>
              <AbstractNodeData Name="gameName" ActionTag="-840548713" Tag="21" IconVisible="False" LeftMargin="857.1913" RightMargin="43.8087" TopMargin="29.7170" BottomMargin="619.2830" FontSize="48" LabelText="BoomBlock" OutlineSize="3" OutlineEnabled="True" ShadowOffsetX="9.0000" ShadowOffsetY="2.0000" ShadowEnabled="True" ctype="TextObjectData">
                <Size X="379.0000" Y="71.0000" />
                <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                <Position X="1046.6913" Y="654.7830" />
                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                <CColor A="255" R="255" G="255" B="255" />
                <PrePosition X="0.8177" Y="0.9094" />
                <PreSize X="0.2961" Y="0.0986" />
                <FontResource Type="Normal" Path="font/SVN-Supercell Magic.ttf" Plist="" />
                <OutlineColor A="255" R="11" G="75" B="136" />
                <ShadowColor A="255" R="94" G="165" B="214" />
              </AbstractNodeData>
              <AbstractNodeData Name="iconFindMatch" ActionTag="-1148631287" Tag="20" IconVisible="False" LeftMargin="974.4043" RightMargin="201.5957" TopMargin="235.0162" BottomMargin="353.9838" LeftEage="34" RightEage="34" TopEage="43" BottomEage="43" Scale9OriginX="34" Scale9OriginY="43" Scale9Width="36" Scale9Height="45" ctype="ImageViewObjectData">
                <Size X="104.0000" Y="131.0000" />
                <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                <Position X="1026.4043" Y="419.4838" />
                <Scale ScaleX="1.3000" ScaleY="1.3000" />
                <CColor A="255" R="255" G="255" B="255" />
                <PrePosition X="0.8019" Y="0.5826" />
                <PreSize X="0.0812" Y="0.1819" />
                <FileData Type="Normal" Path="common/common_icon_glass.png" Plist="" />
              </AbstractNodeData>
              <AbstractNodeData Name="btnFindMatch" Visible="False" ActionTag="653583795" Tag="18" IconVisible="False" LeftMargin="868.3508" RightMargin="58.6492" TopMargin="455.5936" BottomMargin="158.4064" TouchEnable="True" FontSize="14" Scale9Enable="True" LeftEage="15" RightEage="15" TopEage="11" BottomEage="11" Scale9OriginX="15" Scale9OriginY="11" Scale9Width="387" Scale9Height="159" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="ButtonObjectData">
                <Size X="353.0000" Y="106.0000" />
                <Children>
                  <AbstractNodeData Name="txt" ActionTag="-1638614006" Tag="19" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="80.5000" RightMargin="80.5000" TopMargin="21.6600" BottomMargin="51.3400" FontSize="24" LabelText="Find Match" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="TextObjectData">
                    <Size X="192.0000" Y="33.0000" />
                    <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                    <Position X="176.5000" Y="67.8400" />
                    <Scale ScaleX="1.0000" ScaleY="1.0000" />
                    <CColor A="255" R="255" G="255" B="255" />
                    <PrePosition X="0.5000" Y="0.6400" />
                    <PreSize X="0.5439" Y="0.3113" />
                    <FontResource Type="Normal" Path="font/SVN-Supercell Magic.ttf" Plist="" />
                    <OutlineColor A="255" R="255" G="0" B="0" />
                    <ShadowColor A="255" R="110" G="110" B="110" />
                  </AbstractNodeData>
                </Children>
                <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                <Position X="1044.8508" Y="211.4064" />
                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                <CColor A="255" R="255" G="255" B="255" />
                <PrePosition X="0.8163" Y="0.2936" />
                <PreSize X="0.2758" Y="0.1472" />
                <TextColor A="255" R="65" G="65" B="70" />
                <DisabledFileData Type="Normal" Path="lobby/lobby_home_btn_battle_pressing.png" Plist="" />
                <PressedFileData Type="Normal" Path="lobby/lobby_home_btn_battle_pressing.png" Plist="" />
                <NormalFileData Type="Normal" Path="lobby/lobby_home_btn_battle.png" Plist="" />
                <OutlineColor A="255" R="255" G="0" B="0" />
                <ShadowColor A="255" R="110" G="110" B="110" />
              </AbstractNodeData>
              <AbstractNodeData Name="pShop" ActionTag="749929567" Tag="17" IconVisible="False" LeftMargin="34.4572" RightMargin="545.5428" TopMargin="65.6684" BottomMargin="154.3316" TouchEnable="True" ClipAble="False" BackColorAlpha="102" ColorAngle="90.0000" Scale9Enable="True" LeftEage="47" RightEage="47" TopEage="60" BottomEage="60" Scale9OriginX="47" Scale9OriginY="60" Scale9Width="49" Scale9Height="64" ctype="PanelObjectData">
                <Size X="700.0000" Y="500.0000" />
                <Children>
                  <AbstractNodeData Name="node0" ActionTag="-940847654" Tag="30" IconVisible="True" LeftMargin="113.4985" RightMargin="586.5015" TopMargin="128.6837" BottomMargin="371.3163" ctype="SingleNodeObjectData">
                    <Size X="0.0000" Y="0.0000" />
                    <AnchorPoint />
                    <Position X="113.4985" Y="371.3163" />
                    <Scale ScaleX="1.0000" ScaleY="1.0000" />
                    <CColor A="255" R="255" G="255" B="255" />
                    <PrePosition X="0.1621" Y="0.7426" />
                    <PreSize X="0.0000" Y="0.0000" />
                  </AbstractNodeData>
                  <AbstractNodeData Name="node1" ActionTag="-1379041444" Tag="31" IconVisible="True" LeftMargin="352.4272" RightMargin="347.5728" TopMargin="128.6837" BottomMargin="371.3163" ctype="SingleNodeObjectData">
                    <Size X="0.0000" Y="0.0000" />
                    <AnchorPoint />
                    <Position X="352.4272" Y="371.3163" />
                    <Scale ScaleX="1.0000" ScaleY="1.0000" />
                    <CColor A="255" R="255" G="255" B="255" />
                    <PrePosition X="0.5035" Y="0.7426" />
                    <PreSize X="0.0000" Y="0.0000" />
                  </AbstractNodeData>
                  <AbstractNodeData Name="node2" ActionTag="-1435994368" Tag="32" IconVisible="True" LeftMargin="591.3556" RightMargin="108.6444" TopMargin="128.6837" BottomMargin="371.3163" ctype="SingleNodeObjectData">
                    <Size X="0.0000" Y="0.0000" />
                    <AnchorPoint />
                    <Position X="591.3556" Y="371.3163" />
                    <Scale ScaleX="1.0000" ScaleY="1.0000" />
                    <CColor A="255" R="255" G="255" B="255" />
                    <PrePosition X="0.8448" Y="0.7426" />
                    <PreSize X="0.0000" Y="0.0000" />
                  </AbstractNodeData>
                  <AbstractNodeData Name="node3" ActionTag="1137138008" Tag="33" IconVisible="True" LeftMargin="113.4985" RightMargin="586.5015" TopMargin="371.3874" BottomMargin="128.6126" ctype="SingleNodeObjectData">
                    <Size X="0.0000" Y="0.0000" />
                    <AnchorPoint />
                    <Position X="113.4985" Y="128.6126" />
                    <Scale ScaleX="1.0000" ScaleY="1.0000" />
                    <CColor A="255" R="255" G="255" B="255" />
                    <PrePosition X="0.1621" Y="0.2572" />
                    <PreSize X="0.0000" Y="0.0000" />
                  </AbstractNodeData>
                  <AbstractNodeData Name="node4" ActionTag="-1789118632" Tag="34" IconVisible="True" LeftMargin="352.4272" RightMargin="347.5728" TopMargin="371.3874" BottomMargin="128.6126" ctype="SingleNodeObjectData">
                    <Size X="0.0000" Y="0.0000" />
                    <AnchorPoint />
                    <Position X="352.4272" Y="128.6126" />
                    <Scale ScaleX="1.0000" ScaleY="1.0000" />
                    <CColor A="255" R="255" G="255" B="255" />
                    <PrePosition X="0.5035" Y="0.2572" />
                    <PreSize X="0.0000" Y="0.0000" />
                  </AbstractNodeData>
                  <AbstractNodeData Name="node5" ActionTag="1757034484" Tag="36" IconVisible="True" LeftMargin="591.3556" RightMargin="108.6444" TopMargin="371.3874" BottomMargin="128.6126" ctype="SingleNodeObjectData">
                    <Size X="0.0000" Y="0.0000" />
                    <AnchorPoint />
                    <Position X="591.3556" Y="128.6126" />
                    <Scale ScaleX="1.0000" ScaleY="1.0000" />
                    <CColor A="255" R="255" G="255" B="255" />
                    <PrePosition X="0.8448" Y="0.2572" />
                    <PreSize X="0.0000" Y="0.0000" />
                  </AbstractNodeData>
                </Children>
                <AnchorPoint />
                <Position X="34.4572" Y="154.3316" />
                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                <CColor A="255" R="255" G="255" B="255" />
                <PrePosition X="0.0269" Y="0.2143" />
                <PreSize X="0.5469" Y="0.6944" />
                <FileData Type="Normal" Path="lobby/lobby_home_treasure_empty.png" Plist="" />
                <SingleColor A="255" R="223" G="76" B="76" />
                <FirstColor A="255" R="150" G="200" B="255" />
                <EndColor A="255" R="255" G="255" B="255" />
                <ColorVector ScaleY="1.0000" />
              </AbstractNodeData>
              <AbstractNodeData Name="tokenBg" ActionTag="-28001117" Tag="14" IconVisible="False" LeftMargin="459.2222" RightMargin="680.7778" TopMargin="642.4904" BottomMargin="37.5096" ctype="SpriteObjectData">
                <Size X="140.0000" Y="40.0000" />
                <Children>
                  <AbstractNodeData Name="icon" CanEdit="False" ActionTag="1555285611" Tag="15" IconVisible="False" LeftMargin="-43.5466" RightMargin="95.5466" TopMargin="-34.3945" BottomMargin="-33.6055" LeftEage="18" RightEage="18" TopEage="15" BottomEage="15" Scale9OriginX="18" Scale9OriginY="15" Scale9Width="52" Scale9Height="78" ctype="ImageViewObjectData">
                    <Size X="88.0000" Y="108.0000" />
                    <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                    <Position X="0.4534" Y="20.3945" />
                    <Scale ScaleX="0.4800" ScaleY="0.4800" />
                    <CColor A="255" R="255" G="255" B="255" />
                    <PrePosition X="0.0032" Y="0.5099" />
                    <PreSize X="0.6286" Y="2.7000" />
                    <FileData Type="Normal" Path="common/common_icon_gold.png" Plist="" />
                  </AbstractNodeData>
                  <AbstractNodeData Name="txt" ActionTag="-811051713" Tag="16" IconVisible="False" LeftMargin="29.4552" RightMargin="13.5448" TopMargin="4.1509" BottomMargin="8.8491" IsCustomSize="True" FontSize="20" LabelText="99.999" HorizontalAlignmentType="HT_Center" VerticalAlignmentType="VT_Center" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="TextObjectData">
                    <Size X="97.0000" Y="27.0000" />
                    <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                    <Position X="77.9552" Y="22.3491" />
                    <Scale ScaleX="1.0000" ScaleY="1.0000" />
                    <CColor A="255" R="255" G="255" B="255" />
                    <PrePosition X="0.5568" Y="0.5587" />
                    <PreSize X="0.6929" Y="0.6750" />
                    <FontResource Type="Normal" Path="font/SVN-Supercell Magic.ttf" Plist="" />
                    <OutlineColor A="255" R="255" G="0" B="0" />
                    <ShadowColor A="255" R="110" G="110" B="110" />
                  </AbstractNodeData>
                </Children>
                <AnchorPoint ScaleX="0.5587" ScaleY="0.5932" />
                <Position X="537.4402" Y="61.2376" />
                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                <CColor A="255" R="255" G="255" B="255" />
                <PrePosition X="0.4199" Y="0.0851" />
                <PreSize X="0.1094" Y="0.0556" />
                <FileData Type="Normal" Path="lobby/lobby_box.png" Plist="" />
                <BlendFunc Src="1" Dst="771" />
              </AbstractNodeData>
              <AbstractNodeData Name="pHideShop" ActionTag="2109485025" Tag="48" IconVisible="False" LeftMargin="37.9916" RightMargin="1042.0084" TopMargin="67.0747" BottomMargin="152.9253" TouchEnable="True" ClipAble="False" BackColorAlpha="126" ColorAngle="90.0000" Scale9Width="1" Scale9Height="1" ctype="PanelObjectData">
                <Size X="200.0000" Y="500.0000" />
                <AnchorPoint />
                <Position X="37.9916" Y="152.9253" />
                <Scale ScaleX="3.4694" ScaleY="1.0000" />
                <CColor A="255" R="255" G="255" B="255" />
                <PrePosition X="0.0297" Y="0.2124" />
                <PreSize X="0.1563" Y="0.6944" />
                <SingleColor A="255" R="255" G="0" B="0" />
                <FirstColor A="255" R="150" G="200" B="255" />
                <EndColor A="255" R="255" G="255" B="255" />
                <ColorVector ScaleY="1.0000" />
              </AbstractNodeData>
              <AbstractNodeData Name="pLoading" ActionTag="-1943783669" Tag="34" IconVisible="False" PositionPercentXEnabled="True" PercentWidthEnable="True" PercentHeightEnable="True" PercentWidthEnabled="True" PercentHeightEnabled="True" TouchEnable="True" ClipAble="False" BackColorAlpha="213" ComboBoxIndex="1" ColorAngle="90.0000" ctype="PanelObjectData">
                <Size X="1280.0000" Y="720.0000" />
                <Children>
                  <AbstractNodeData Name="loadingIcon" ActionTag="537449930" Tag="35" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="265.0000" RightMargin="265.0000" TopMargin="-15.0000" BottomMargin="-15.0000" LeftEage="247" RightEage="247" TopEage="247" BottomEage="247" Scale9OriginX="247" Scale9OriginY="247" Scale9Width="256" Scale9Height="256" ctype="ImageViewObjectData">
                    <Size X="750.0000" Y="750.0000" />
                    <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                    <Position X="640.0000" Y="360.0000" />
                    <Scale ScaleX="0.3100" ScaleY="0.3100" />
                    <CColor A="255" R="255" G="255" B="255" />
                    <PrePosition X="0.5000" Y="0.5000" />
                    <PreSize X="0.5859" Y="1.0417" />
                    <FileData Type="Normal" Path="loading.png" Plist="" />
                  </AbstractNodeData>
                </Children>
                <AnchorPoint />
                <Position />
                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                <CColor A="255" R="255" G="255" B="255" />
                <PrePosition />
                <PreSize X="1.0000" Y="1.0000" />
                <SingleColor A="255" R="0" G="0" B="0" />
                <FirstColor A="255" R="150" G="200" B="255" />
                <EndColor A="255" R="255" G="255" B="255" />
                <ColorVector ScaleY="1.0000" />
              </AbstractNodeData>
            </Children>
            <AnchorPoint />
            <Position />
            <Scale ScaleX="1.0000" ScaleY="1.0000" />
            <CColor A="255" R="255" G="255" B="255" />
            <PrePosition />
            <PreSize X="1.0000" Y="1.0000" />
            <FileData Type="Normal" Path="lobby/bg.png" Plist="" />
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