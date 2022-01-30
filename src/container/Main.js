import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './Main.css';
import { Container, Form, FormGroup, Label, Button } from 'reactstrap';
import Footer from './Footer';
import Header from './Header';

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
			'.label__right'
		).textContent = `글자 수 : ${input.length}`;
	}, [input]);

	useEffect(() => {
		updateTextLen();
	}, [updateTextLen]);

	const handleSubmitKor = async (event) => {
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
		<div className="mainContainer">
			<div className="contentsContainer">
				<Header />
				{isLoading ? (
					<div className="runningMsg">
						<h2>요약 중입니다.</h2>
						<p>잠시 후 결과창으로 이동합니다.</p>
					</div>
				) : (
					<Container className="formContainer">
						<br />
						<div>
							<Form onSubmit={handleSubmitKor}>
								<Label for="input" className="label">
									<div className="label__left">
										요약할 텍스트를 입력해주세요. 500 단어
										이내로 입력하세요!
									</div>
									<div className="label__right">
										텍스트 길이가 표시됩니다.
									</div>
									<Button
										color="primary"
										onClick={btnRefresh}
									>
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
								<br />
								<br />
								<FormGroup className="resultBtn">
									<Button color="success" type="submit">
										요약하기
									</Button>{' '}
									<Button color="danger" href={`/`}>
										취소
									</Button>
								</FormGroup>
							</Form>
						</div>
						<br />
						<br />
					</Container>
				)}
				<Footer />
			</div>
		</div>
	);
};

export default Main;
