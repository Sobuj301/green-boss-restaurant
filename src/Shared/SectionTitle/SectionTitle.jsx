
const SectionTitle = ({heading,subHeading}) => {
    return (
        <div className="w-1/3 mx-auto text-center mt-10 mb-10 space-y-2">
            <p className="text-yellow-600">--- {subHeading} ---</p>
            <h2 className="border-y-4 py-3 uppercase text-xl">{heading}</h2>
        </div>
    );
};

export default SectionTitle;