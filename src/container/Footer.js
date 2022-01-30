import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => (
	<div className="footer">
		<div className="copyright">
			© Copyright by{' '}
			<Link
				to={{ pathname: 'https://github.com/younghwani' }}
				target="_blank"
				style={{ color: 'black' }}
			>
				younghwani
			</Link>
			{', '}
			<Link
				to={{ pathname: 'https://github.com/SongJongbeen' }}
				target="_blank"
				style={{ color: 'black' }}
			>
				SongJongbeen
			</Link>
			{', '}
			<Link
				to={{ pathname: 'https://github.com/riproskaie' }}
				target="_blank"
				style={{ color: 'black' }}
			>
				riproskaie
			</Link>
		</div>
	</div>
);

export default Footer;
