import React from 'react'
import './TheNewDetailManagerment.css';
import { TheNew  } from '../../../../typeObject';
import ReactHtmlParser from 'react-html-parser';
import { format } from 'date-fns';
import {getTheNewById} from '../../../../api/CallApi'
interface TheNewId {
    id: string
}
export const TheNewDetailManagerment: React.FC<TheNewId> = ({ id }) => {
    
    const [theNew, setTheNew]= React.useState<TheNew>();

    React.useEffect(() =>  {
        const fetchTheNew = async ()=>{
            const response = await getTheNewById(id);
            setTheNew(response.data);
        }
        fetchTheNew();
    }, [id]);

    const formatTime = theNew?.thoiGianViet ? format(new Date(theNew.thoiGianViet), 'dd/MM/yyyy') : '';

    return (
        <div className="body_detailthenewmanagement">

            <h2>CHI TIẾT BÀI VIẾT</h2>
            <h2>{theNew?.tenBaiViet}</h2>
            <div className="row">
                <div className='item'>
                    <p>Chủ đề: </p>
                    <p>{theNew?.chuDeBaiViet}</p>
                </div>
                <div className='item'>
                    <p>Ngày đăng: </p>
                    <p>{formatTime}</p>
                </div>
            </div>
            <div className="row">
                <div style={{width:"31%"}}>
                    <img src={theNew?.hinhAnhBaiViet} alt="upload" />
                </div>
                <div style={{width:"68%"}}>
                    <p>{ReactHtmlParser(theNew?.noiDungBaiViet)}</p>
                </div>
            </div>
        </div>
    )
}
