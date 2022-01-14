import { Comment, Tooltip, List, Statistic, Row, Col } from 'antd';
import moment from 'moment';

function Reviews(){
  const data = [
    {
      actions: [<span key="comment-list-reply-to-0">Reply to</span>],
      author: '0x8626f6940e2eb28930efb4cef49b2d1f2c9c1199',
      avatar: 'https://joeschmoe.io/api/v1/random',
      content: (
        <p>
          This collection is made by a very famous artist, which adds great value.
        </p>
      ),
    },
    {
      actions: [<span key="comment-list-reply-to-0">Reply to</span>],
      author: '0xdd2fd4581271e230360230f9337d5c0430bf44c0',
      avatar: 'https://joeschmoe.io/api/v1/random',
      content: (
        <p>
          Discord was managed badly.
        </p>
      ),
    },
  ];

  return (
    <div style={{ padding: '0 100px' }}>
      <List
        className="comment-list"
        // header={`${data.length} reviews`}
        itemLayout="horizontal"
        dataSource={data}
        renderItem={item => (
          <li>
            <Row gutter={16}>
              <Statistic title="Rating" value={3} suffix="/ 5" />
            </Row>
            <Row gutter={16}>
              <Comment
                // actions={item.actions}
                author={item.author}
                avatar={item.avatar}
                content={item.content}
                // datetime={item.datetime}
              />
            </Row>
          </li>
        )}
      />
    </div>
  )
}

export default Reviews
