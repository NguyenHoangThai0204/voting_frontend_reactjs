import React, { useState } from "react";
import "./InstructionScreen.css";

export const InstructionScreen = () => {
    // State để kiểm soát việc hiển thị nội dung từng loại poll
    type Section = "publicPoll" | "privatePoll" | "anonymousPoll";

    const [openSections, setOpenSections] = useState<Record<Section, boolean>>({
        publicPoll: false,
        privatePoll: false,
        anonymousPoll: false,
    });

    // Hàm toggle trạng thái ẩn/hiện
    const toggleSection = (section: Section) => {
        setOpenSections((prev) => ({
            ...prev,
            [section]: !prev[section],
        }));
    };

    return (
        <div style={{padding:'5px'}}>
            <div style={{ width: '100%', textAlign: 'center' }}><p className="container_instrcction_title">Hướng dẫn sử dụng</p></div>
            <div className="container_instrcction">

                <div className="container_instrcction_left">
                    <h1>Có 3 kiểu tạo cuộc bình chọn: </h1>

                    {/* Loại Poll 1 */}
                    <section>
                        <div className="section-header">
                            <h2>1. Public Poll (Bình chọn công khai)</h2>
                            <button
                                onClick={() => toggleSection("publicPoll")}
                                className="button-toggle"
                            >
                                {openSections.publicPoll ? "Ẩn" : "Hiển thị"}
                            </button>
                        </div>
                        {openSections.publicPoll && (
                            <div className="content-list">
                                <p>
                                    <strong>Mô tả:</strong> Mọi người đều có thể tham gia, đưa ra lựa chọn không bị giới hạn và xem kết quả sau khi kết thúc.
                                </p>
                                <p>
                                    <strong>Ưu điểm:</strong>
                                </p>
                                <ul>
                                    <li>Dễ dàng tiếp cận với mọi người dùng.</li>
                                    <li>Phù hợp để thu thập ý kiến từ cộng đồng lớn.</li>
                                </ul>
                                <p>
                                    <strong>Nhược điểm:</strong>
                                </p>
                                <ul>
                                    <li>Người tham gia không cần có tài khoản nên không thể ghi lại kết quả do ai lựa chọn.</li>
                                    <li>Có nguy cơ gian lận do 1 người có thể tham gia nhiều lựa chọn khác nhau dẫn đến việc không đạt được kết quả mong muốn.</li>
                                    <li>Kết quả có thể không đại diện cho một nhóm cụ thể.</li>
                                </ul>
                                <p>
                                    <strong>Trường hợp sử dụng:</strong> Khảo sát ý kiến cộng đồng về một vấn đề hoặc
                                    sự kiện.
                                </p>
                                <p>
                                    <strong>Cách sử dụng:</strong>
                                </p>
                                <ol>
                                    <li>Chọn "Công khai" khi tạo bình chọn.</li>
                                    <li>Chia sẻ đường link bình chọn với mọi người.</li>
                                    <li>Theo dõi kết quả trong thời gian thực.</li>
                                </ol>
                            </div>
                        )}
                    </section>

                    {/* Loại Poll 2 */}
                    <section>
                        <div className="section-header">
                            <h2>2. Private Poll (Bình chọn riêng tư)</h2>
                            <button
                                onClick={() => toggleSection("privatePoll")}
                                className="button-toggle"
                            >
                                {openSections.privatePoll ? "Ẩn" : "Hiển thị"}
                            </button>
                        </div>
                        {openSections.privatePoll && (
                            <div className="content-list">
                                <p>
                                    <strong>Mô tả:</strong> Chỉ những người có tài khoản mới được tham gia bình chọn và xem kết quả.
                                </p>
                                <p>
                                    <strong>Ưu điểm:</strong>
                                </p>
                                <ul>
                                    <li>Mỗi tài khoản người dùng chỉ được 1 lần tham gia bình chọn.</li>
                                    <li>Thông tin người vote được lưu lại, ghi nhận thời gian chọn, và lựa chọn.</li>
                                </ul>
                                <p>
                                    <strong>Nhược điểm:</strong>
                                </p>
                                <ul>
                                    <li>Những người có tải khoản đều có thể vào xem và đưa ra lựa chọn của mình.</li>
                                    <li>Cần quản lý danh sách người tham gia, có thể mất thời gian.</li>
                                    <li>Không phù hợp cho các chiến dịch khảo sát quy mô lớn.</li>
                                </ul>
                                <p>
                                    <strong>Trường hợp sử dụng:</strong> Lấy ý kiến trong nhóm nhỏ, ví dụ: quyết
                                    định trong nội bộ công ty, gia đình, lớp học...
                                </p>
                                <p>
                                    <strong>Cách sử dụng:</strong>
                                </p>
                                <ol>
                                    <li>Chọn "Riêng tư" khi tạo bình chọn.</li>
                                    <li>Gửi link bình chọn đến nhóm của bạn.</li>
                                </ol>
                            </div>
                        )}
                    </section>

                    {/* Loại Poll 3 */}
                    <section>
                        <div className="section-header">
                            <h2>3. Advanced Poll (Bình chọn nâng cao)</h2>
                            <button
                                onClick={() => toggleSection("anonymousPoll")}
                                className="button-toggle"
                            >
                                {openSections.anonymousPoll ? "Ẩn" : "Hiển thị"}
                            </button>
                        </div>
                        {openSections.anonymousPoll && (
                            <div className="content-list">
                                <p>
                                    <strong>Mô tả:</strong> Người tham gia cần phải có tài khoản và phải có liên kết với ví metamask mới có thể tạo và tham gia cuộc bình chọn.
                                </p>
                                <p>
                                    <strong>Ưu điểm:</strong>
                                </p>
                                <ul>
                                    <li>Khuyến khích người dùng tiếp cận với công nghệ tiền ảo mới.</li>
                                    <li>Phù hợp với các cuộc khảo sát nhạy cảm.</li>
                                    <li>Xem được kết quả cuộc bình chọn, người đã tham gia, thời gian bình chọn, nhưng lựa chọn của họ bị ẩn đi trong block của nền tảng blockchain.</li>
                                </ul>
                                <p>
                                    <strong>Nhược điểm:</strong>
                                </p>
                                <ul>
                                    <li>Người tham gia cần có tài khoản liên kết với ví metamask.</li>
                                    <li>Không phù hợp cho các chiến dịch khảo sát quy mô lớn, công khai ra bên ngoài.</li>
                                </ul>
                                <p>
                                    <strong>Trường hợp sử dụng:</strong> Khảo sát ý kiến về các vấn đề quan trọng như các cuộc bầu của chính trị, xã hội, kinh tế, giám đốc,...
                                </p>
                                <p>
                                    <strong>Cách sử dụng:</strong>
                                </p>
                                <ol>
                                    <li>Chọn "Nâng cao" khi tạo bình chọn.</li>
                                    <li>Chia sẻ đường link bình chọn với các thành viên.</li>
                                </ol>
                            </div>
                        )}
                    </section>

                    <p style={{ color: 'red', margin: '9px 0 2px 0' }}>
                        Lưu ý:
                    </p>
                    <ul style={{padding:'5px'}}>
                        <li>Nếu tài khoản thường thì mỗi tháng chỉ tạo tối đa 2 cuộc bình chọn công khai hoặc riêng tư.</li>
                        <li>Nếu tài khoản có kết nối ví thì có thể tạo nhiều cuộc bình chọn.</li>
                    </ul>

                </div>


                <div className="container_instrcction_right"><h1>Hướng dẫn chi tiết qua video: </h1>
                    <div className="video-container">
                        <iframe
                            src="https://www.youtube.com/embed/dnqmkIUeJE8"
                            title="YouTube video player"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                    </div></div>

            </div>
        </div>
    );
};
