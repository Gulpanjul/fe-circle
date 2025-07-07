type Props = {
    title: string;
    message: string;
};

function EmptyState({ title, message }: Props) {
    return (
        <div className="flex flex-col justify-center items-center h-full text-center">
            <p className="text-2xl font-medium">{title}</p>
            <p className="text-base text-muted-foreground mt-1 w-80">
                {message}
            </p>
        </div>
    );
}

export default EmptyState;
