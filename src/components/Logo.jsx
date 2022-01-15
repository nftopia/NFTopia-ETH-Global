import Link from 'next/link'

const Logo = () => {
	return (
		<div style={{ display: 'flex', marginLeft: '20px' }}>
			<Link href="/">
				<a>
          		    <img width="60" height="auto" src="/logo.png" alt=""/>
				</a>

			</Link>
		</div>
	)
}

export default Logo