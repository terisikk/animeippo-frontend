import { Spinner, Spyglass } from "./Icons";

function Header({ activeTab, loading, setActiveTab, onSubmit, contentReady }) {
  console.log("rendering header: ");
  console.log(contentReady);
  return (
    <div className={`max flex flex-wrap pb-8 pt-5 transition-height duration-1000 ease-in-out max-lg:pt-20`}>
      <div className={`ml-auto flex flex-1 flex-wrap justify-center`}>
        <MalSearchForm onSubmit={onSubmit} loading={loading} contentReady={contentReady}></MalSearchForm>
      </div>
      <div className={`flex w-full flex-wrap justify-center ${contentReady ? "visible" : "hidden"}`}>
        <Tab text="2022" active={activeTab === "0"} onClick={() => setActiveTab("0")} disabled={loading} />
        <Tab text="2023" active={activeTab === "1"} onClick={() => setActiveTab("1")} disabled={loading} />
        <Tab text="2024" active={activeTab === "2"} onClick={() => setActiveTab("2")} disabled={loading} />
      </div>
    </div>
  );
}

function MalSearchForm({ onSubmit, loading, contentReady }) {
  return (
    <form className={`flex w-full items-center justify-center p-5`} onSubmit={onSubmit}>
      <input
        className="rounded-l border border-blue-700 p-2.5 disabled:!bg-gray-400 disabled:text-gray-600"
        name="maluser"
        type="text"
        placeholder="Anilist username"
        disabled={loading}
      />
      <label className="margin-0 text-white" id="recommendLabel" htmlFor="maluser">
        <button
          type="submit"
          className="rounded-r border border-blue-700 bg-blue-700 p-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          {loading ? <Spinner /> : <Spyglass />}
        </button>
      </label>
      <input type="submit" hidden />
    </form>
  );
}

function Tab({ active, onClick, text, disabled }) {
  return (
    <button
      className={`${
        active ? "border-b border-blue-200 bg-gray-300 text-blue-500" : "text-white hover:bg-zinc-700"
      }  m:text-md xs:text-sm my-2 mr-2 line-clamp-1 w-36 cursor-pointer text-clip rounded rounded-b-none py-2 text-center font-sans text-xl font-medium tracking-wide`}
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </button>
  );
}

export default Header;
