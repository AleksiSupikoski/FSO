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
    <h3>
      total of {totalExercises} exercises
    </h3>
  )
}


const Course = ({ course }) => {
  return (
    <div>
      <Header coursename={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

export default Course