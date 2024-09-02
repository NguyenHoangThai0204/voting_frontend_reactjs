import "./ContentDetailVote.css"
import TextField from '@mui/material/TextField';

export const ContentDetailVote = () => {
  return (
    <div className="wrapper_detail_vote">
      <form>
        <div className="header_content_form">
          <div className="header_content_form_right">
            <label htmlFor="upload_image_vote" className="upload_area">
              <img></img>
            </label>
          </div>
          <div className="header_content_form_left">
            <div className="label">Name vote:</div>
            <h1>CHỦ ĐỀ</h1>
            <div className="label">Description:</div>
            <TextField className="text_namevote" multiline rows={4} variant="outlined" />
          </div>

        </div>

      </form>
    </div>
  )
}
