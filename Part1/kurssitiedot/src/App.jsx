const Header = ({ coursename }) => {
  return (
    <h1>
      {coursename}
    </h1>
  )
}

const Part = ({ name, noEx }) => {
  return (
    <p>
      {name} {noEx}
    </p>
  )
}

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map((part, index) => (<Part key={index} name={part.name} noEx={part.exercises} />))}
    </div>
  )
}

const Total = ({ parts }) => {
  const totalExercises = parts.reduce((sum, part) => sum + part.exercises, 0)
  return (
    <p>
      Number of exercises {totalExercises}
    </p>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header coursename={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

export default App
