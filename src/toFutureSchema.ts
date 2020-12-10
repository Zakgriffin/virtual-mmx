// TODO this should be part of schema, and it should be VibraphoneBar

// Vibraphone
export const vibraphoneBars = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] as const;
export type VibraphoneBarTOFIX = typeof vibraphoneBars[number];

// Bass
export const bassStrings = [1, 2, 3, 4] as const;
export type BassStringTOFIX = typeof bassStrings[number];

// Drum
export const drumTypes = ["bassdrum", "hihat", "snare", "crash"] as const;
export type DrumTypeTOFIX = typeof drumTypes[number];

// Instrument
export const instrumentNames = ["bass", "drums", "vibraphone"] as const;
export type InstrumentName = typeof instrumentNames[number];

// ChannelGroup
export const channelGroups = [
	"bassdrum",
	"hihat",
	"snare",
	"crash",
	"vibraphone",
	"bass",
] as const;
export type ChannelGroupTOFIX = typeof channelGroups[number];

// HiHatMachineMode
export type HiHatMachineMode =
	| "beat"
	| "beatAndOffbeat"
	| "offbeat"
	| "offbeatAndSixteenth"
	| "sixteenth"
	| "sixteenthAndTriplet"
	| "triplet"
	| "off";
