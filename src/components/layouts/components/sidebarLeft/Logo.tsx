import brandLogo from '@/assets/logo.svg';

function Logo() {
    return (
        <img
            src={brandLogo}
            alt="Circle Logo"
            className="px-4 mb-6 items-start"
        />
    );
}

export default Logo;
