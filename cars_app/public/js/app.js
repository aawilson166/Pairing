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
				<h2>Garage</h2>
				<form onSubmit={this.handleSubmit}>
					<label className='create' htmlFor='name'>
						Make
					</label>
					<input
						className='create'
						type='text'
						id='make'
						onChange={this.handleChange}
						value={this.state.name}
					/>

					<label className='create' htmlFor='species'>
						Model
					</label>
					<input
						className='create'
						type='text'
						id='model'
						onChange={this.handleChange}
						value={this.state.species}
					/>

					<label className='create' htmlFor='year'>
						Year
					</label>
					<input
						className='create'
						type='text'
						id='model'
						onChange={this.handleChange}
						value={this.state.species}
					/>

					<label className='create' htmlFor='image'>
						Image
					</label>
					<input
						className='create'
						type='text'
						id='image'
						onChange={this.handleChange}
						value={this.state.image}
					/>

					<input className='create submit' type='submit' value='Add a Car' />
				</form>
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
