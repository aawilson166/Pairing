class App extends React.Component {
	state = {
		make: '',
		model: '',
		year: '',
		image: '',
		cars: []
	};

	//This function changes the state of the objects listen above
	handleChange = event => {
		this.setState({
			//the square brackets dynamically updates the objects property
			[event.target.id]: event.target.value
		});
	};

	//This function is what executes when we hit submit
	handleSubmit = event => {
		event.preventDefault();
		axios.post('/cars', this.state).then(response => {
			this.setState({
				cars: response.data,
				make: '',
				model: '',
				year: '',
				image: ''
			});
		});
	};

	deleteCar = event => {
		axios.delete('/cars/' + event.target.value).then(response => {
			this.setState({
				cars: response.data
			});
		});
	};

	updateCar = event => {
		event.preventDefault();
		const id = event.target.id;
		axios.put('/cars/' + id, this.state).then(response => {
			this.setState({
				cars: response.data,
				make: '',
				model: '',
				year: '',
				image: ''
			});
		});
	};

	//this function renders the info from the database onto the webpage on load
	componentDidMount = () => {
		axios.get('/cars').then(response => {
			this.setState({
				cars: response.data
			});
		});
	};

	render = () => {
		return (
			<div>
				<div className='card mt-3 col-6 offset-3'>
					<h2 className='card-title my-3'>Garage</h2>
					<div className='card-body'>
						<form onSubmit={this.handleSubmit}>
							<div className='card-text my-3'>
								<label className='mx-1' htmlFor='make'>
									Make
								</label>
								<input
									className='mx-1'
									type='text'
									id='make'
									onChange={this.handleChange}
									value={this.state.make}
								/>
							</div>

							<div className='card-text my-3'>
								<label className='mx-1' htmlFor='model'>
									Model
								</label>
								<input
									className='mx-1'
									type='text'
									id='model'
									onChange={this.handleChange}
									value={this.state.model}
								/>
							</div>

							<div className='card-text my-3'>
								<label className='mx-1' htmlFor='year'>
									Year
								</label>
								<input
									className='mx-1'
									type='text'
									id='year'
									onChange={this.handleChange}
									value={this.state.year}
								/>
							</div>

							<div className='card-text my-3'>
								<label className='mx-1' htmlFor='image'>
									Image
								</label>
								<input
									className='mx-1'
									type='text'
									id='image'
									onChange={this.handleChange}
									value={this.state.image}
								/>
							</div>

							<input
								className='btn btn-primary my-3'
								type='submit'
								value='Add a Car'
							/>
						</form>
					</div>
				</div>
				<div className='carContainer'>
					{this.state.cars.map(car => {
						return (
							<div className='carCard' key={car._id}>
								{car.name} <br />
								{car.species} <br />
								<img src={car.image} alt={car.name} /> <br />
								<button value={car._id} onClick={this.deleteCar}>
									Delete Car
								</button>
								<details>
									<summary>Update this Car</summary>
									<form id={car._id} onSubmit={this.updateCar}>
										<label htmlFor='make'>Make</label>
										<br />
										<input type='text' id='make' onChange={this.handleChange} />
										<br />
										<label htmlFor='model'>Model</label>
										<br />
										<input
											type='text'
											id='model'
											onChange={this.handleChange}
										/>
										<br />

										<label htmlFor='year'>Year</label>
										<br />
										<input type='text' id='year' onChange={this.handleChange} />
										<br />

										<label htmlFor='image'>Image</label>
										<br />
										<input
											type='text'
											id='image'
											onChange={this.handleChange}
										/>
										<br />
										<input
											className='submit'
											type='submit'
											value='Update Car'
										/>
									</form>
								</details>
							</div>
						);
					})}
				</div>
			</div>
		);
	};
}

ReactDOM.render(<App></App>, document.querySelector('main'));
