import {
	Image,
	List
} from 'antd'


const styles = {
	carousel: {
		marginBottom: '25px',
		width: '100%'
	}
}
const NFTCarousel = ({source}) => {
	const { Item } = List

	return (
		<div style={styles.carousel}>
			<List
				grid={{gutter: 8, column: 10}}
				dataSource={source}
				pagination={{
					onChange: page => {
				  console.log(page)
					},
					pageSize: 8,
			  }}
				renderItem={item => (
					<Item>
						<Image
							width={162}
							height={162}
							src={item.image}
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

export default NFTCarousel
