import { Select, createListCollection } from "@ark-ui/react";

import { ChevronDown, Check } from "lucide-react";

import { useMemo } from "react";

export default function AppSelect({ value, onChange, options }) {
    /*
    |--------------------------------------------------------------------------
    | Crear colección compatible con Ark UI
    |--------------------------------------------------------------------------
    */

    const collection = useMemo(
        () =>
            createListCollection({
                items: options,
            }),
        [options],
    );

    return (
        <Select.Root
            collection={collection}
            value={[value]}
            onValueChange={(details) => onChange(details.value[0])}
        >
            <Select.Control>
                <Select.Trigger
                    className="
                        w-full
                        px-3
                        py-2
                        border
                        border-gray-300
                        rounded-lg
                        bg-white
                        flex
                        items-center
                        justify-between
                        focus:ring-2
                        focus:ring-pink-500
                    "
                >
                    <Select.ValueText />

                    <ChevronDown
                        className="
                            w-4
                            h-4
                        "
                    />
                </Select.Trigger>
            </Select.Control>

            <Select.Positioner>
                <Select.Content
                    className="
                        bg-white
                        rounded-lg
                        shadow-xl
                        border
                        mt-2
                        overflow-hidden
                        z-50
                    "
                >
                    {collection.items.map((option) => (
                        <Select.Item
                            key={option.value}
                            item={option}
                            className="
                                    px-3
                                    py-2
                                    cursor-pointer
                                    hover:bg-pink-50
                                    flex
                                    justify-between
                                "
                        >
                            <Select.ItemText>{option.label}</Select.ItemText>

                            <Select.ItemIndicator>
                                <Check
                                    className="
                                            w-4
                                            h-4
                                            text-pink-500
                                        "
                                />
                            </Select.ItemIndicator>
                        </Select.Item>
                    ))}
                </Select.Content>
            </Select.Positioner>
        </Select.Root>
    );
}
