function firstTranslation(artifact) {
    if (
        !Array.isArray(artifact?.translations) ||
        artifact.translations.length === 0
    ) {
        return null;
    }

    return (
        artifact.translations.find((item) => item?.languageCode === "en") ||
        artifact.translations[0]
    );
}

function toDimensionValue(value) {
    if (value === null || value === undefined) return "N/A";
    return String(value);
}

export function mapApiArtifactToUi(artifact) {
    const translation = firstTranslation(artifact);

    return {
        id: artifact?.id || "",
        categoryId: artifact?.categoryId || artifact?.category?.id || "",
        categoryName: artifact?.category?.name || "Artifact",
        name: translation?.name || artifact?.slug || "Artifact",
        description: translation?.description || "No description available.",
        image: "/assets/images/eh.png",
        accessionNumber: artifact?.slug || "N/A",
        period: artifact?.era?.name || "Unknown Era",
        associatedKing: "Unknown",
        material: artifact?.material?.name || "Unknown",
        dimensions: {
            height: toDimensionValue(artifact?.height),
            width: toDimensionValue(artifact?.width),
            depth: toDimensionValue(artifact?.depth),
            weight: toDimensionValue(artifact?.weight),
        },
        discoverySite: artifact?.discoveryLocation?.city || "Unknown Site",
        image3D: null,
        status: "published",
    };
}
