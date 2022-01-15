import { Statistic, Card, Row, Col } from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';


function CollectionStats(){

	const styles = {
		background: {
			padding: '0 100px',
		  // padding: '30px',
		  background: '#ececec',
		}
	}

	return (
		<div style={styles.background}>
	    <Row gutter={16}>
	      <Col span={12}>
	        <Card>
	          <Statistic
	            title="Items"
	            value={3}
	            precision={0}
	            valueStyle={{ color: '#3f8600' }}
	            // prefix={<ArrowUpOutlined />}
	            // suffix="%"
	          />
	        </Card>
	      </Col>
	      <Col span={12}>
	        <Card>
	          <Statistic
	            title="Owners"
	            value={1}
	            precision={0}
	            valueStyle={{ color: '#cf1322' }}
	            // prefix={<ArrowDownOutlined />}
	            // suffix="%"
	          />
	        </Card>
	      </Col>
	    </Row>
			<Row gutter={16}>
	      <Col span={12}>
	        <Card>
	          <Statistic
	            title="Novelty"
	            value={7.5}
	            precision={1}
	            valueStyle={{ color: '#3f8600' }}
	            // prefix={<ArrowUpOutlined />}
	            // suffix="%"
	          />
	        </Card>
	      </Col>
	      <Col span={12}>
	        <Card>
	          <Statistic
	            title="Community Rating"
	            value={5}
	            precision={0}
	            valueStyle={{ color: '#cf1322' }}
	            // prefix={<ArrowDownOutlined />}
	            // suffix="%"
	          />
	        </Card>
	      </Col>
	    </Row>
	  </div>
	)
}

export default CollectionStats
