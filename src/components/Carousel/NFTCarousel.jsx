import {
	Image,
	List
} from 'antd'


const styles = {
	carousel: { 
		marginTop: '25px', 
		color: '#494949',
		width: '100%',
	}
}
const NFTCarousel = () => {
	const { Item } = List

	return (
		<div style={styles.carousel}>
			<List
				grid={{gutter: 8, column: 5}}
				dataSource={dummyData}
				pagination={{
					onChange: page => {
				  console.log(page)
					},
					pageSize: 5,
			  }}
				renderItem={item => (
					<Item>
						<Image
							width={225}
							height={200}
							src={item.Image}
							placeholder={
								<Image
									preview={false}
									src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png?x-oss-process=image/blur,r_50,s_50/quality,q_1/resize,m_mfit,h_200,w_200"
									width={200}
								/>
							}
						/>
					</Item>
				)}
			/>
		</div>
	)
}

const dummyData = [
	{
		Image: 'https://source.unsplash.com/featured/?macbook'
	},
	{
		Image: 'https://source.unsplash.com/featured/?macbook'
	},
	{
		Image: 'https://source.unsplash.com/featured/?macbook'
	},
	{
		Image: 'https://source.unsplash.com/featured/?macbook'
	},
	{
		Image: 'https://source.unsplash.com/featured/?macbook'
	},
	{
		Image: 'https://source.unsplash.com/featured/?iphone'
	},
	{
		Image: 'https://source.unsplash.com/featured/?iphone'
	},
	{
		Image: 'https://source.unsplash.com/featured/?iphone'
	},
	{
		Image: 'https://source.unsplash.com/featured/?iphone'
	},
	{
		Image: 'https://source.unsplash.com/featured/?iphone'
	}
]


export default NFTCarousel