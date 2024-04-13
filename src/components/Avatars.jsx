import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'

function Avatars() {
    const [avatars, setAvatars] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAvatars = async () => {
            try {
                const response = await fetch('./assets/avatars.json');
                if (!response.ok) {
                    throw new Error('Failed to fetch avatars');
                }
                const data = await response.json();
                setAvatars(data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchAvatars();
    }, []);

    const handleAvatarClick = (avatar) => {
        console.log(avatar);
        if (localStorage.getItem('avatar')) {
            window.alert('ya tienes un usuario registrado')
            navigate('/Chat')
        } else {
            localStorage.setItem('avatar', JSON.stringify(avatar));
            navigate('/Chat')
        }
    };

    return (
        <div className='max-w-[960px] h-full flex flex-col gap-5 items-center justify-center m-auto'>
            <h1 className='text-2xl font-semibold text-[#383838]'>Selecciona tu Avatar</h1>

            <section className='flex justify-center w-full flex-wrap gap-4'>
                {avatars.map((avatar, index) => (
                    <div key={index} onClick={() => handleAvatarClick(avatar)} className='p-2 gap-2 select-none cursor-pointer flex rounded-xl bg-white w-[300px] shadow-lg transition-transform hover:scale-[1.04] hover:bg-[#a3ff7e] hover:transition-colors'>
                        <img src={avatar.photo} height={50} width={50} alt={index} />
                        <div>
                            <p className='text-[18px] text-[#383838] font-semibold'>{avatar.name}</p>
                            <p className='text-[#9e9e9e] text-sm'>{avatar.email}</p>
                        </div>
                    </div>
                ))}
            </section>
        </div>
    );
}

export default Avatars