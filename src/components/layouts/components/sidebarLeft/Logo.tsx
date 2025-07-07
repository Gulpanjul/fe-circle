import LogoImage from '@/assets/logo.svg';

function Logo() {
    return (
        <img
            src={LogoImage}
            alt="Circle Logo"
            className="px-4 mb-6 items-start"
        />
    );
}

export default Logo;
