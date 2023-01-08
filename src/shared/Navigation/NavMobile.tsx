import { Disclosure } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/solid";
import { ConnectButton, useWallet } from "@suiet/wallet-kit";
import { NAVIGATION_DEMO_2 } from "data/navigation";
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import ButtonClose from "shared/ButtonClose/ButtonClose";
import Logo from "shared/Logo/Logo";
import SocialsList from "shared/SocialsList/SocialsList";
import { NavItemType } from "./NavigationItem";




export interface NavMobileProps {
  data?: NavItemType[];
  onClickClose?: () => void;
}


const NavMobile: React.FC<NavMobileProps> = ({
  data = NAVIGATION_DEMO_2,
  onClickClose,
}) => {
  const _renderMenuChild = (item: NavItemType) => {

    return (
      <ul className="nav-mobile-sub-menu pl-6 pb-1 text-base">
        {item.children?.map((i, index) => (
          <Disclosure key={i.href + index} as="li">
            <NavLink
              end
              to={{
                pathname: i.href || undefined,
              }}
              className={({ isActive }) =>
                `flex px-4 py-2.5 dark:text-neutral-200 text-sm font-medium rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 mt-[2px] ${isActive ? "text-secondary-500" : "text-neutral-900"
                }`
              }
            >
              <span
                className={!i.children ? "block w-full" : ""}
                onClick={onClickClose}
              >
                {i.name}
              </span>
              {i.children && (
                <span
                  className="block flex-grow"
                  onClick={(e) => e.preventDefault()}
                >
                  <Disclosure.Button
                    as="span"
                    className="flex justify-end flex-grow"
                  >
                    <ChevronDownIcon
                      className="ml-2 h-4 w-4 text-neutral-500"
                      aria-hidden="true"
                    />
                  </Disclosure.Button>
                </span>
              )}
            </NavLink>
            {i.children && (
              <Disclosure.Panel>{_renderMenuChild(i)}</Disclosure.Panel>
            )}

          </Disclosure>
        ))}
      </ul>
    );
  };

  const _renderItem = (item: NavItemType, index: number) => {
    return (
      <Disclosure
        key={item.id}
        as="li"
        className="text-neutral-900 dark:text-white"
      >
        <NavLink
          end
          className={({ isActive }) =>
            `flex w-full items-center py-2.5 px-4 font-medium uppercase tracking-wide text-sm hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg ${isActive ? "text-secondary-500" : ""
            }`
          }
          to={{
            pathname: item.href || undefined,
          }}
        >
          <span
            className={!item.children ? "block w-full" : ""}
            onClick={onClickClose}
          >
            {item.name}
          </span>
          {item.children && (
            <span
              className="block flex-grow"
              onClick={(e) => e.preventDefault()}
            >
              <Disclosure.Button
                as="span"
                className="flex justify-end flex-grow"
              >
                <ChevronDownIcon
                  className="ml-2 h-4 w-4 text-neutral-500"
                  aria-hidden="true"
                />
              </Disclosure.Button>
            </span>
          )}
        </NavLink>
        {item.children && (
          <Disclosure.Panel>{_renderMenuChild(item)}</Disclosure.Panel>
        )}
      </Disclosure>
    );
  };

  const { connecting, select, connected, account, ...rest } = useWallet();
  const [showModal, setShowModal] = useState(false);
  function connectWallet() {
    setShowModal(true);
  }

  return (
    <div className="overflow-y-auto w-full max-w-sm h-screen py-2 transition transform shadow-lg ring-1 dark:ring-neutral-700 bg-white dark:bg-neutral-900 divide-y-2 divide-neutral-100 dark:divide-neutral-800">
      <div className="py-6 px-5">
        <Logo />
        <div className="flex flex-col mt-5 text-neutral-700 dark:text-neutral-300 text-sm">
          <span>
            Discover the most outstanding articles on all topics of life. Write
            your stories and share them
          </span>

          <div className="flex justify-between items-center mt-4">
            <SocialsList itemClass="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded-full text-xl" />
          </div>
        </div>
        <span className="absolute right-2 top-2 p-1">
          <ButtonClose onClick={onClickClose} />
        </span>
      </div>
      <ul className="flex flex-col py-6 px-2 space-y-1">
        <a className="inline-flex items-center text-sm xl:text-base py-2 px-4 xl:px-5 rounded-full hover:text-neutral-900 hover:bg-neutral-100 dark:hover:bg-neutral-800 dark:hover:text-neutral-200 font-normal text-neutral-700 dark:text-neutral-300" href="https://twitter.com/home">
          Apply For Launchpad
        </a>
        {data.map(_renderItem)}
      </ul>
      <div className="flex items-center justify-between py-6 px-5 space-x-2">
        <ConnectButton className='connect-wallet-btn'>
          Connect Wallet
        </ConnectButton>

      </div>
    </div>
  );
};

export default NavMobile;
