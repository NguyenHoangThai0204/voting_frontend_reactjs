// .home_layout {
//     display: flex;
//     flex-direction: column;
//     position: relative;
//     min-height: 100vh; /* Đảm bảo chiều cao tối thiểu của layout là 100% của màn hình */
//     background-color: rgb(226, 240, 231);
//   }
  
//   .home_layout .header_home {
//     width: 100%;
//     position: fixed;
//     z-index: 10;
//     top: 0;
//     border-bottom: 1px solid rgb(215, 214, 214);
//     animation: headerIn 0.8s ease-in-out forwards;
//     opacity: 0;
//   }
  
//   .home_layout .content_home {
//     display: block;
//     margin: 0 auto;
//     margin-top: 70px;
//     width: 98%;
//     flex-grow: 1; /* Cho phép nội dung phát triển chiều cao theo nhu cầu */
//   }
//   .home_layout .content_home .body_home {
//     display: flex;
//     flex: 1;
//     height: auto; /* Thay vì chiều cao cố định, cho phép nó linh động */
//   }
  
//   .home_layout .content_home .body_home .menu_left {
//     width: 8%;
//     position: sticky;
//     top: 70px; /* Menu sẽ dừng ở đầu trang khi cuộn */
//     height: 100vh; /* Menu sẽ kéo dài hết chiều cao màn hình */
//     padding: 5px;
//     animation: menuIn 0.8s ease-in-out forwards;
//     transition: opacity 0.8s ease-in-out;
//   }
  
  
//   .home_layout .content_home .body_home .content_right {
//     width: 92%;
//     flex-grow: 1; /* Nội dung chính sẽ tự động chiếm không gian còn lại */
//     margin-top: 5px;
//     animation: content_right 3s ease-in-out forwards;
//   }
  
//   .home_layout .footer_home {
//     width: 100%;
//     background-color: rgb(47, 136, 138);
//     position: relative;
//     padding-top: 10px;
//     margin-top: auto; /* Đẩy footer xuống dưới cùng */
//   }
//   /* Tiêu chí */
//   .criteria_section {
//     text-align: center;
//   }
  
//   .criteria_section h2 {
//     font-size: 24px;
//     margin-bottom: 20px;
//   }
  
//   .criteria_row {
//     display: flex;
//     justify-content: space-around;
//     gap: 20px;
//     flex-wrap: wrap;
//   }
  
//   .criteria_item {
//     flex: 1 1 calc(30% - 20px); /* Đảm bảo độ rộng linh hoạt */
//     background-color: gray;
//     color: white;
//     padding: 15px;
//     border-radius: 8px;
//     text-align: center;
//   }
//   @keyframes headerIn {
//     from {
//       transform: translateY(-100%);
//       opacity: 0;
//     }
//     to {
//       transform: translateY(0);
//       opacity: 1;
//     }
//   }
//   @keyframes content_right {
//     from {
//       transform: translateX(0);
//       opacity: 0;
//     }
//     to {
//       transform: translateX(0);
//       opacity: 1;
//     }
//   }
//   @keyframes menuIn {
//     from {
//       transform: translateX(-100%);
//       opacity: 0;
//     }
//     to {
//       transform: translateX(0);
//       opacity: 1;
//     }
//   }
//   .criteria_title {
//     font-weight: bold;
//     font-size: 20px;
//     margin-bottom: 10px;
//   }
  
//   .criteria_description {
//     font-size: 16px;
//   }
//   @media screen and (max-width: 900px) {
//     .home_layout {
//       display: block;
     
//     }
//     .home_layout .content_home {
//       display: flex;
//       flex-direction: column;
//       width: 100%;
//     }
//     .home_layout .content_home .body_home .menu_left {
//       width: 100%;
//       /* order: 2; */
//       background-color: white;
//       position: fixed;
//       bottom: 0;       
//        height: 100px;
//       z-index: 10;
//     }
//     .home_layout .content_home .body_home .content_right {
//       width: 100%;
//       order: 1;
//       flex-grow: 1;
//     }
//     .footer_home {
//       width: 100%;
//       order: 3;
//       background-color: gray;
//       position: relative;
//       padding-bottom: 93px;
//     }
//   }