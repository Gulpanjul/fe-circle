import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FaFacebook, FaGithub, FaInstagram, FaLinkedin } from 'react-icons/fa';

function Meta() {
    return (
        <Card className="bg-secondary">
            <CardHeader>
                <CardTitle className="text-sm flex flex-wrap gap-1">
                    Developed By
                    <span className="font-semibold"> Andhika C. Gulpa</span>
                    <span className="text-muted-foreground">•</span>
                    {/* Social Icons */}
                    <div className="flex gap-2 items-center">
                        <a
                            href="https://github.com/username"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <FaGithub className="w-3 h-3 sm:w-4 sm:h-4" />
                        </a>
                        <a
                            href="https://linkedin.com/in/username"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <FaLinkedin className="w-3 h-3 sm:w-4 sm:h-4" />
                        </a>
                        <a
                            href="https://facebook.com/username"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <FaFacebook className="w-3 h-3 sm:w-4 sm:h-4" />
                        </a>
                        <a
                            href="https://instagram.com/username"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <FaInstagram className="w-3 h-3 sm:w-4 sm:h-4" />
                        </a>
                    </div>
                </CardTitle>
            </CardHeader>

            <CardContent className="text-sm sm:text-base text-muted-foreground">
                Powered by{' '}
                <span className="font-semibold">Dumbways Indonesia</span> • #1
                Coding Bootcamp
            </CardContent>
        </Card>
    );
}

export default Meta;
