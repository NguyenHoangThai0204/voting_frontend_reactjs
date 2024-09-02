import React, { useState, useEffect } from 'react';
import { ItemVote } from '../ItemVote/ItemVote';
import "./ListStype.css"; // Sửa tên file CSS nếu cần
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Vote } from '../../../../typeObject';

interface ListVotingProps {
  voted: Vote[];
}

export const ListVoted: React.FC<ListVotingProps> = ({ voted }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(4); // Giới hạn số mục trên mỗi trang

    // Tính toán mục hiện tại dựa trên trang hiện tại
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = voted.slice(indexOfFirstItem, indexOfLastItem);

    const handleClick = (direction: string) => {
        if (direction === 'next' && indexOfLastItem < voted.length) {
            setCurrentPage((prev) => prev + 1);
        } else if (direction === 'prev' && indexOfFirstItem > 0) {
            setCurrentPage((prev) => prev - 1);
        }
    };

    // Theo dõi kích thước màn hình và thay đổi số lượng mục trên mỗi trang
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 900) {
                setItemsPerPage(2);
            } else {
                setItemsPerPage(4);
            }
        };

        // Thiết lập kích thước ban đầu
        handleResize();

        // Thay đổi số lượng mục khi kích thước màn hình thay đổi
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div style={{ display: 'block', padding: '10px' }}>
            <div className='wrapper_list_vote'>
                {currentItems.map((item) => (
                    <ItemVote key={item._id} item={item} />
                ))}
            </div>
            <div className='pagination'>
                <button
                    onClick={() => handleClick('prev')}
                    disabled={currentPage === 1}
                    className='arrow-button'
                >
                    <ArrowBackIosIcon />
                </button>
                <span>Page {currentPage}</span>
                <button
                    onClick={() => handleClick('next')}
                    disabled={indexOfLastItem >= voted.length}
                    className='arrow-button'
                >
                    <ArrowForwardIosIcon />
                </button>
            </div>
        </div>
    );
};
