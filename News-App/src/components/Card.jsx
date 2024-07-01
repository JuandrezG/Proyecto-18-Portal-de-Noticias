
const Card = ({ title, imagePath, body }) => {
    return (
    <section className="container bg-gray-100 min-w-[300px] mx-auto p-6 md:p-12 transform duration-500">
        <article className="shadow-lg mx-auto relative max-w-sm group cursor-pointer">
            <div className="overflow-hidden aspect-w-16 aspect-h-9 ">
                <img className="w-full h-auto transform hover:scale-110 duration-200 " src={imagePath} alt="" />
            </div>
            <div className="p-4 my-auto pb-8">
                <h1 className="text-2xl font-semibold text-gray-800 mt-2">{title}</h1>
                <p className="text-lg text-gray-400 mt-2 leading-relaxed max-h-64 overflow-hidden">
                    {body}
                </p>
            </div>
        </article>
    </section>
    );
  };
export default Card;
