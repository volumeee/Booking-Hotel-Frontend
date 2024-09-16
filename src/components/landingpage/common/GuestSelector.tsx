import React from "react";
import { Button } from "@nextui-org/react";

interface GuestSelectorProps {
    label: string;
    value: number;
    onChange: (value: number) => void;
}

const GuestSelector: React.FC<GuestSelectorProps> = ({
    label,
    value,
    onChange,
}) => {
    return (
        <div className="flex items-center justify-between">
            <span>{label}</span>
            <div className="flex items-center ml-2">
                <Button
                    size="sm"
                    variant="flat"
                    onClick={() => onChange(value - 1)}
                    disabled={value === 0}
                >
                    -
                </Button>
                <span className="mx-2">{value}</span>
                <Button size="sm" variant="flat" onClick={() => onChange(value + 1)}>
                    +
                </Button>
            </div>
        </div>
    );
};

export default GuestSelector;
