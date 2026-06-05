import Image from "next/image"

const movies = [
  {id: 1, title: "Sinners", image:"/images/Sinners.jpg", rank: 1 },
  {id: 2, title: "Jurassic Park", image:"/images/Jurassicpark.jpg", rank: 2 },
  {id: 3, title: "tangled", image:"/images/tangled.jpg", rank: 3 },
  {id: 4, title: "KungFu Panda", image:"/images/KungFu.jpg", rank: 4 },
  {id: 5, title: "Shrek", image:"/images/Shrek.jpg", rank: 5 },
  {id: 6, title: "Obsession", image:"/images/Obsession.jpg", rank: 6 },
]

export default function Home() {
  return (
    <>
    <div className="relative w-full h-screen bg-linear-to-r from-fuchsia-500 via-red-600 to-orange-400">
        <Image
        src="/images/Sinners.jpg"
        alt="movie"
        fill
        className="object-cover"/>
        <div className="absolute inset-0 bg-linear-to-t from-black via-black/50 to-transparent"/>
        <div className="absolute inset-0" style={{
        background: "radial-gradient(ellipse at center, transparent 70%, rgba(0,0,0,0.8) 100%)"
      }} />
      

      <div className="flex overflow-x-auto gap-4 absolute bottom-20 left-20 rounded">
        {movies.map((movies) => (
          <div key={movies.id} className="relative">

            <div className="absolute top-0 left-0 bg-red-600 text-white text-s p-1 z-5 rounded-xl">
              TOP {movies.rank}
              </div>

              <Image src={movies.image} alt={movies.title} width={240} height={360}
              className="rounded-xl"/>
              <p>{movies.title}</p>
      </div>
      ))}
     </div>
     </div>

     <div className="min-h-screen w-full relative bg-linear-to-r from-indigo-500 via-blue-600 to-green-400 flex
     items-center justify-center text-center flex-col gap-10 text-white p-52">
      <h1 className="text-7xl">Section 2</h1>
      <p className="text-3x1">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Distinctio, 
        dicta. Atque eos tempora exercitationem aliquid et vitae itaque excepturi, minima expedita dolor, 
        obcaecati quas provident suscipit deserunt porro quos! A aperiam dolor illo doloremque reiciendis placeat 
        adipisci sint cupiditate harum dolores soluta porro minus veniam consequuntur quos aliquam doloribus, possimus maxime nemo 
        sit sequi laudantium blanditiis facilis quam! Nulla consectetur incidunt quos doloremque officia? Excepturi 
        maiores eius minus maxime architecto quibusdam magnam voluptas error sit nostrum labore minima, expedita, ut eum, 
        non doloribus molestias possimus. Veniam ut ducimus optio quidem iusto libero. 
        Incidunt eius possimus facere fuga aliquid nulla quae libero minima quasi natus, 
        ut debitis ratione velit voluptatibus recusandae nobis labore? Voluptatibus consequatur veniam sunt aliquid facere fuga, 
        sapiente officia vel incidunt eligendi? Illum qui nobis minima, corrupti odit error provident eos molestias libero aliquid quibusdam 
        quidem labore unde nam beatae quam animi dolores natus perferendis modi sed quis magni illo! Soluta nostrum repellat atque ducimus tempore mollitia. 
        Fugiat quo impedit deleniti atque repellat, vero esse magnam voluptatum corrupti repellendus ex non qui earum reprehenderit laborum iusto aliquid eum. Adipisci, 
        delectus amet! Eveniet consequatur possimus corporis, repellendus soluta, exercitationem laboriosam, 
        esse iure architecto necessitatibus fugiat hic perferendis in totam?</p>
     </div>

     </>

     

     

  )
}