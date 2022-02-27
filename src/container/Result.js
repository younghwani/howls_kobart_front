import React from 'react';
import Footer from './Footer';
import Header from './Header';
import { Button } from 'reactstrap';
import './Result.css';

const Result = ({ match }) => {
	let result = match.params.result;

	const mainPageBtnClick = () => {
		window.location.href = '/';
	};

	return (
		<div className="MainContainer">
			{/* <video
				className="bg-video"
				playsInline
				autoPlay
				muted
				loop
				src="https://github.com/younghwani/temp/blob/master/newsstand.mp4?raw=true"
				typeof="video/mp4"
			></video> */}
			<div className="resultContainer">
				<Header />
				<div className="summary">
					<div className="contents">
						<h2>요약 결과</h2>
						<p>“</p>
						<p>{result}</p>
						<p>”</p>
					</div>
					<div className="backBtn">
						<Button color="primary" onClick={mainPageBtnClick}>
							Back
						</Button>
					</div>
				</div>
				<Footer />
			</div>
		</div>
	);
};

export default Result;
