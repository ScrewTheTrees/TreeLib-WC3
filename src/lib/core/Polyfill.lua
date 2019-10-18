function FourCC(input)
    return ({string.unpack(">I4", input)})
end
