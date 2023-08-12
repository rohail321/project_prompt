"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
const Nav = () => {
  const { data: session } = useSession();
  const [providers, setProviders] = useState(null);
  const [toogleDropdown, setToogleDropdown] = useState(false);

  useEffect(() => {
    const setProvider = async () => {
      const response = await getProviders();
      setProviders(response);
    };

    setProvider();
  }, []);

  return (
    <nav className='flex-between w-full mb-16'>
      <Link href='/' className='flex gap-2'>
        <Image
          src='/assets/images/logo.svg'
          alt='Promptopia'
          width={30}
          height={30}
          className='object-contain'
        />
        Promptopia
      </Link>

      {/* desktop nav */}
      <div className='sm:flex hidden'>
        {session?.user ? (
          <div className='flex gap-3 md:gap-5'>
            <Link href='/create-prompt' className='black_btn'>
              Create post
            </Link>
            <button className='outline_btn' onClick={() => signOut()}>
              Sign Out
            </button>
            <Link href='/profile'>
              <Image
                src={session.user.image}
                width={37}
                height={37}
                className='rounded-full'
                alt='profile'
              />
            </Link>
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type='button'
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  className='black_btn'
                >
                  {" "}
                  Sign In{" "}
                </button>
              ))}
          </>
        )}
      </div>
      {/* mobile nav */}

      <div className='sm:hidden flex relative'>
        {session?.user ? (
          <div className='flex '>
            <Image
              src='/assets/images/logo.svg'
              width={37}
              height={37}
              className='rounded-full'
              alt='profile'
              onClick={() => setToogleDropdown((prev) => !prev)}
            />
            {toogleDropdown && (
              <div className='dropdown'>
                <Link
                  href='/profile'
                  className='dropdown_link'
                  onClick={() => setToogleDropdown(false)}
                >
                  My Profile
                </Link>
                <Link
                  href='/create-prompt'
                  className='dropdown_link'
                  onClick={() => setToogleDropdown(false)}
                >
                  Create Prompt
                </Link>
                <button
                  type='button'
                  onClick={() => {
                    setToogleDropdown(false);
                    signOut();
                  }}
                  className='mt-5 w-full black_btn'
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type='button'
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  className='black_btn'
                >
                  {" "}
                  Sign In{" "}
                </button>
              ))}
          </>
        )}
      </div>
    </nav>
  );
};

export default Nav;
