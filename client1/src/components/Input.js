const fixedInputClass =
    'rounded-md appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm';

export default function Input({
    labelText,
    labelFor,
    isRequired = false,
    className,
    ...rest
}) {
    return (
        <div className="my-5">
            <label htmlFor={labelFor} className="sr-only">
                {labelText}
            </label>
            <input
                required={isRequired}
                className={fixedInputClass + className}
                {...rest}
            />{' '}
        </div>
    );
}
