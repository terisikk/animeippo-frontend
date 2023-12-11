import { Spinner, Spyglass } from "./Icons";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";

function Header({ activeYear, loading, setActiveYear, onSubmit, contentReady }) {
  return (
    <div className={`max flex flex-wrap pb-8 pt-5 transition-height duration-1000 ease-in-out max-lg:pt-20`}>
      <div className={`ml-auto flex flex-1 flex-wrap justify-center`}>
        <SearchForm onSubmit={onSubmit} loading={loading} contentReady={contentReady}></SearchForm>
      </div>
      <HeaderTabBar
        activeYear={activeYear}
        contentReady={contentReady}
        setActiveYear={setActiveYear}
        loading={loading}
      ></HeaderTabBar>
    </div>
  );
}

function HeaderTabBar({ activeYear, contentReady, setActiveYear, loading }) {
  var currentYear = new Date().getFullYear();

  console.log(activeYear);
  console.log(currentYear);

  var renderLastTab = true;

  if (activeYear > currentYear) {
    renderLastTab = false;
  }

  return (
    <div className={`flex w-full flex-wrap justify-center ${contentReady ? "visible" : "hidden"}`}>
      <Tab text={activeYear - 1} active={false} onClick={() => setActiveYear(activeYear - 1)} disabled={loading} />
      <Tab text={activeYear} active={true} onClick={() => setActiveYear(activeYear)} disabled={loading} />
      {renderLastTab && (
        <Tab text={activeYear + 1} active={false} onClick={() => setActiveYear(activeYear + 1)} disabled={loading} />
      )}
    </div>
  );
}

function SearchForm({ onSubmit, loading, contentReady }) {
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
      {/*<DropDown></DropDown>*/}
      <input type="submit" hidden />
    </form>
  );
}

function DropDown() {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="ml-5 inline-flex w-full justify-center gap-x-1.5 rounded-md rounded-l border border-blue-700 bg-white p-3 text-sm font-semibold text-gray-900  ring-gray-300 hover:bg-gray-50">
          <span>ANI</span>
          <svg class="-mr-1 h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path
              fill-rule="evenodd"
              d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
              clip-rule="evenodd"
            />
          </svg>
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            <Menu.Item>{({ active }) => <span className="block">ANI</span>}</Menu.Item>
            <Menu.Item>{({ active }) => <span className="block">MAL</span>}</Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
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
