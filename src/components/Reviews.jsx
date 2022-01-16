import { Comment, List, Statistic, Row } from 'antd'

function Reviews(){
	const data = [
		{
			actions: [<span key="comment-list-reply-to-0">Reply to</span>],
			author: '0xBda2cA755d376F4ac7418afdb0176Ae90084b8A5',
			avatar: 'https://joeschmoe.io/api/v1/random',
			content: (
				<p>
          I like this!
				</p>
			),
		},
	]

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
							<Statistic title="Rating" value={4} suffix="/ 5" />
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
