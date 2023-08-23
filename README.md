Game demo

https://github.com/phutruonnttn/Game_Bomb_NFT/assets/45969976/1aa77140-7420-45d9-817c-8cd8e76cbaad

1. Thông tin:
   - Đồ án tốt nghiệp của Nguyễn Phú Trường - 20184319, sinh viên ngành Công nghệ thông tin Global ICT (IT-E7), trường Đại học Bách Khoa Hà Nội, năm học (2018 - 2023). Đồ án đạt điểm tổng kết A thuộc hội đồng bảo vệ Multimedia và Game.
     
2. Mô tả:
   - Đây là 1 game NFT multiplayer, người chơi sẽ sở hữu nhân vật để chơi kiếm token hoặc có thể giao dịch nhân vật này trên các sàn marketplace như 1 loại tài sản số. Để chơi game người chơi cần 1 nhân vật và 1 lượng token in-game, người chiến thắng sẽ nhận 1 lượng token thưởng tưởng ứng.
     
3. Công nghệ sử dụng:
   - Cocos2d-x JS
   - Cocos Studio
   - Java, JavaScript, Solidity
   - Polygon zkEVM
     
4. Giải thích các thành phần:
   - client: chứa code client chạy trên simulator win 32
   - server: chứa server game, để tương tác với client và server API
   - cocosUI: thiết kế GUI cho client
   - connectMetamaskGUI: GUI connect với ví metamask của user, trả về UID để user đăng nhập game
   - serverAPI: server private để giao tiếp với smart contract, được request từ server game
   - smartContract: chứa các smart contract được dùng trong game, các smart contract này được deploy trên polygon zkEVM testnet
