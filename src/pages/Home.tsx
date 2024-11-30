import UserMenu from "../components/UserMenu"

const Home = () => {
  return (
    <div className='w-full flex gap-5 justify-center'>
      <div className="w-full max-w-[630px]">
        posts go here
      </div>
      <UserMenu />
    </div>
  )
}

export default Home
