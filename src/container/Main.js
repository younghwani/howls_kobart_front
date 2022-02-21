import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './Main.css';
import { Container, Form, FormGroup, Label, Button } from 'reactstrap';
import Footer from './Footer';
import Header from './Header';
import loadImg from '../loadImg.png';

const Main = () => {
	const [input, setInput] = useState('');
	const [isLoading, setIsLoading] = useState(false);

	let output = '';

	function onInputChange(event) {
		const target = event.target;
		const value = target.value;
		setInput(value);
		updateTextLen();
	}

	// TODO: 단어 수 세는 로직 필요하다.
	const updateTextLen = React.useCallback(() => {
		document.querySelector(
			'.text_len'
		).textContent = `글자 수 : ${input.length}`;
	}, [input]);

	useEffect(() => {
		updateTextLen();
	}, [updateTextLen]);

	const handleSubmit = async (event) => {
		event.preventDefault();
		setIsLoading(true);
		const data = await axios.get(
			`http://localhost:8080/api/kobartSum?text=${input}`
		);
		output = data.data.output;
		console.log(output);
		setIsLoading(false);
		window.location.href = `/result/${output}`;
	};

	// TODO: 텍스트 길이가 일정 범위 이상이면 요약을 하지 못하도록 막도록 구성한다. - copy&paste 시 500 단어 이상 등록되는 것을 방지하기
	function handleKeyPress(target) {
		if (input.length >= 2000) {
			alert('500 단어 이하로 입력해주세요!');
			setInput('');
			document.getElementById('input').value = '';
		}
	}

	function btnRefresh() {
		setInput('');
		document.getElementById('input').value = '';
	}

	return (
		<div className="contentsContainer">
			<Header />
			<Container className="formContainer">
				<Form onSubmit={handleSubmit}>
					<Label for="input" className="label">
						<div className="label__desc">
							요약할 텍스트를 입력해주세요. 500 단어 이내로
							입력하세요!
						</div>
						<Button color="primary" onClick={btnRefresh}>
							새로고침
						</Button>
					</Label>
					<br />
					<textarea
						className="input__text"
						type="text"
						name="input"
						id="input"
						value={input}
						onChange={onInputChange}
						placeholder="텍스트를 입력해주세요.."
						onKeyPress={handleKeyPress}
					/>
					<div className="form__footer">
						<div className="text_len">
							텍스트 길이가 표시됩니다.
						</div>
						{isLoading ? (
							<>
							<img className="loadingResult" src={loadImg} alt="Loading..."/>
							<p>요약 중입니다.</p>
							</>
						) : (
							<FormGroup className="resultBtn">
								<Button color="success" type="submit">
									요약하기
								</Button>{' '}
							</FormGroup>
						)}
					</div>
				</Form>
			</Container>
			<Footer />
		</div>
	);
};

export default Main;
