import { useState, useEffect } from 'react';
import personService from './services/persons';
import { Notification, Errormessage } from './components/Notification';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';

const App = () => {
	const [persons, setPersons] = useState([]);
	const [newName, setNewName] = useState('');
	const [newNumber, setNewNumber] = useState('');
	const [findName, setFindName] = useState('');
	const [notifyMessage, setNotifyMessage] = useState(null);
	const [errorMessage, setErrorMessage] = useState(null);

	useEffect(() => {
		personService.getAll().then((response) => {
			setPersons(response);
		});
	}, []);

	const addPerson = (event) => {
		event.preventDefault();

		if (persons.find((person) => person.name === newName)) {
			if (!confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
				return;
			}
			const person = persons.find((person) => person.name === newName);
			const changedPerson = { ...person, number: newNumber };

			personService.update(person.id, changedPerson).then((response) => {
				setPersons(persons.map((p) => (p.id !== response.id ? p : response)));
				setNotifyMessage(`Updated ${response.name}`);
				setTimeout(() => {
					setNotifyMessage(null);
				}, 5000);
				setNewName('');
				setNewNumber('');
			});
			return;
		}

		const personObject = {
			name: newName,
			number: newNumber,
		};

		personService.create(personObject).then((response) => {
			setPersons(persons.concat(response));
			setNotifyMessage(`Added ${response.name}`);
			setTimeout(() => {
				setNotifyMessage(null);
			}, 5000);
			setNewName('');
			setNewNumber('');
		});
	};

	const deletePerson = (id) => {
		const person = persons.find((p) => p.id === id);
		if (confirm(`Delete ${person.name}?`)) {
			personService
				.remove(id)
				.then(() => {
					setPersons(persons.filter((p) => p.id !== id));
					setNotifyMessage(`Deleted ${person.name}`);
					setTimeout(() => {
						setNotifyMessage(null);
					}, 5000);
				})
				.catch((error) => {
					setErrorMessage(`${person.name} has already been removed, removing locally...`);
					setTimeout(() => {
						setErrorMessage(null);
					}, 5000);
					setPersons(persons.filter((p) => p.id !== id));
				});
		}
	};

	const handleNameChange = (event) => setNewName(event.target.value);
	const handleNumberChange = (event) => setNewNumber(event.target.value);
	const handleFindNameChange = (event) => setFindName(event.target.value);

	const filteredPersons = persons.filter((person) =>
		person.name.toLowerCase().includes(findName.toLowerCase())
	);

	return (
		<div>
			<h2>Phonebook</h2>
			<Notification message={notifyMessage} />
			<Errormessage message={errorMessage} />
			<Filter findName={findName} handleFindNameChange={handleFindNameChange} />
			<PersonForm
				newName={newName}
				newNumber={newNumber}
				handleNameChange={handleNameChange}
				handleNumberChange={handleNumberChange}
				addPerson={addPerson}
			/>
			<h2>Numbers</h2>
			<Persons filteredPersons={filteredPersons} deletePerson={deletePerson} />
		</div>
	);
};

export default App;
