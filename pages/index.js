import Error from 'next/error';

const Home = ({ tasks, statusCode }) => {
  if (statusCode) {
    return <Error statusCode={statusCode} />;
  }

  return (
    <div>
      <h1>Tasks</h1>
      <ul>
        {!tasks ? null : tasks.map((task, index) => {
          return <li key={index}>{task.title}</li>
        })}
      </ul>
    </div>
  )
}

Home.getInitialProps = async (_ctx) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/tasks`);
    const data = await res.json();
    return {
      tasks: data.tasks,
    };
  } catch (error) {
    return {
      statusCode: error.response ? error.response.status : 500,
    };
  }
};

export default Home;
