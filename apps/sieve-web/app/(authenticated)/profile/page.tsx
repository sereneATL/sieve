"use client";

import { trpc } from "@/sieve-web/app/trpc";
import {
  Avatar,
  Button,
  Checkbox,
  Input,
  Select,
  SelectItem,
  Spinner,
  Textarea,
} from "@nextui-org/react";
import { signOut, useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa";
import { toast } from "react-toastify";
import {
  MusicPreferences,
  SpotifyAudioFeatures,
  UserProfile,
} from "../../../types/types";
import {
  aggregateAudioFeatures,
  compileSpotifyArtistsData,
  compileSpotifyTracksData,
  getSpotifyData,
} from "./spotifyData";

export default function Profile(): JSX.Element {
  const { data } = useSession();
  const [userProfile, setUserProfile] = useState<UserProfile>();
  const [gender, setGender] = useState<"FEMALE" | "MALE">();
  const [age, setAge] = useState<number>();
  const [personalityType, setPersonalityType] = useState<
    "INTROVERT" | "EXTROVERT" | "AMBIVERT"
  >();
  const [sportsScore, setSportsScore] = useState<number>(0);
  const [artsEntertainmentScore, setArtsEntertainmentScore] =
    useState<number>(0);
  const [outdoorActivitiesScore, setOutdoorActivitiesScore] =
    useState<number>(0);
  const [technologyGamingScore, setTechnologyGamingScore] = useState<number>(0);
  const [culinaryArtsScore, setCulinaryArtsScore] = useState<number>(0);
  const [wellnessFitnessScore, setWellnessFitnessScore] = useState<number>(0);
  const [otherHobbies, setOtherHobbies] = useState<number>(0);

  const [genderPreference, setGenderPreference] = useState<
    "FEMALE" | "MALE" | "ALL"
  >();
  const [minAgePreference, setMinAgePreference] = useState<number>();
  const [maxAgePreference, setMaxAgePreference] = useState<number>();
  const [samePersonalityPreference, setSamePersonalityPreference] =
    useState<boolean>();
  const [sameMusicTypePreference, setSameMusicTypePreference] =
    useState<number>();

  const [loading, setLoading] = useState(false);

  const [musicPreferences, setMusicPreferences] = useState<MusicPreferences>();
  const [audioFeatures, setAudioFeatures] = useState<SpotifyAudioFeatures>();
  const [profilePicUrl, setProfilePicUrl] = useState<string>();

  const router = useRouter();
  const searchParams = useSearchParams();
  const edit = !!searchParams.get("edit");

  const [maxAgeRange, setMaxAgeRange] = useState<boolean>(false);

  useEffect(() => {
    if (data?.user?.email) {
      trpc.user.query({ email: data?.user?.email }).then((response) => {
        "error" in response
          ? router.push("/profile?edit=true")
          : setUserProfile(response.data as UserProfile);
      });
    }

    async function getAllData() {
      getSpotifyData({ path: "/me", token: data?.accessToken }).then(
        (response: any) => {
          console.log(response);
          if ("error" in response && response.error.status === 401) {
            signOut({
              callbackUrl: "/timeout",
              redirect: true,
            });
          }
          setProfilePicUrl(response.images[1].url);
        },
      );
      const { names, topGenres } = await compileSpotifyArtistsData(
        data?.accessToken,
      );
      const { id, trackNames } = await compileSpotifyTracksData(
        data?.accessToken,
      );

      setMusicPreferences({
        topTracksId: id,
        topTracksString: trackNames,
        topArtists: names,
        topGenres,
      });
    }
    if (data?.user?.email) {
      getAllData();
    }
  }, [data?.user, data?.accessToken]);

  useEffect(() => {
    if (userProfile?.musicPreferences && edit) {
      router.push("/profile");
    }
  }, [userProfile, edit]);

  useEffect(() => {
    async function getAggregatedAudioFeatures(
      token: string,
      topTracksIdData: string[],
    ) {
      const aggregated = await aggregateAudioFeatures(topTracksIdData, token);
      setAudioFeatures(aggregated);
    }
    if (data?.accessToken && musicPreferences?.topTracksId) {
      getAggregatedAudioFeatures(
        data.accessToken,
        musicPreferences?.topTracksId,
      );
    }
  }, [musicPreferences?.topTracksId, data?.accessToken]);

  const saveMusicPreferences = async (userId: number) => {
    if (musicPreferences && audioFeatures) {
      return await trpc.createUserMusicPreferences
        .mutate({
          userId,
          topTracksId: musicPreferences.topTracksId ?? [""],
          topTracksString: musicPreferences.topTracksString ?? [""],
          topArtists: musicPreferences.topArtists ?? 0,
          topGenres: musicPreferences.topGenres ?? 0,
          acousticnessScore: audioFeatures.acousticness ?? 0,
          danceabilityScore: audioFeatures.danceability ?? 0,
          energyScore: audioFeatures.energy ?? 0,
          instrumentalnessScore: audioFeatures.instrumentalness ?? 0,
          livenessScore: audioFeatures.liveness ?? 0,
          speechinessScore: audioFeatures.speechiness ?? 0,
          valenceScore: audioFeatures.valence ?? 0,
        })
        .catch((error) => {
          toast.error(error.message);
        });
    }
  };

  const saveUserProfile = async () => {
    return await trpc.createUser
      .mutate({
        email: data?.user?.email ?? "",
        name: data?.user?.name ?? "",
        gender: gender!,
        age: age!,
        profilePicture: profilePicUrl ?? data?.user?.image ?? "",
        personalityType: personalityType!,
        genderPreference: genderPreference!,
        samePersonalityPreference: samePersonalityPreference!,
        sameMusicTypePreference: sameMusicTypePreference!,
        minAgePreference: minAgePreference!,
        maxAgePreference: maxAgePreference!,
        sportsScore,
        artsEntertainmentScore,
        outdoorActivitiesScore,
        technologyGamingScore,
        culinaryArtsScore,
        wellnessFitnessScore,
        otherHobbies,
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  const onSubmit = async () => {
    setLoading(true);
    // save user
    const response = await saveUserProfile();
    // save music preferences
    if (response && response.data) {
      saveMusicPreferences(response.data.id).then(() => {
        toast.success("Profile successfully saved!");
        router.push("/dashboard");
      });
    }
  };

  return data?.user ? (
    <>
      <div className="w-full sm:w-2/3 flex flex-col gap-4 md:gap-8">
        <div className="flex flex-col gap-4 items-center">
          <h3 className="text-[#a20f0f] md:text-3xl text-md font-head">
            {edit && "Update"} My Profile
          </h3>
          {edit && (
            <>
              <h2 className="text-[#594E60] md:text-xl text-sm font-head">
                add your details to help sieve your perfect match
              </h2>
            </>
          )}
          <Avatar
            isBordered
            isFocusable
            showFallback
            as="button"
            className="transition-transform sm:w-[100px] sm:h-[100px] w-[50px] h-[50px]"
            color="secondary"
            name={data.user.name ?? ""}
            src={data.user.image ?? ""}
          />
        </div>
        <form
          onSubmit={onSubmit}
          className="w-full flex flex-col gap-4 font-mono text-[#382a40]"
        >
          <Input
            isDisabled
            type="name"
            label="Name"
            value={data?.user?.name ?? ""}
          />
          <Input
            isDisabled
            type="email"
            label="Email"
            value={data?.user?.email ?? ""}
          />

          <Textarea
            isDisabled
            label="Musical aura"
            value={musicPreferences?.topGenres.slice(0, 8).join(", ")}
          />

          <Textarea
            label="Top artists"
            isDisabled
            value={musicPreferences?.topArtists.slice(0, 8).join(", ")}
          />

          <Textarea
            label="Top tracks"
            isDisabled
            value={musicPreferences?.topTracksString.slice(0, 8).join(", ")}
          />

          {edit && (
            <>
              <div className="text-[#a20f0f] font-head mt-2 flex flex-row gap-2">
                <p>About me</p>
                <FaHeart className="mt-1" />
              </div>

              <Select
                label="Gender"
                isDisabled={!edit}
                onSelectionChange={(keys: any) =>
                  setGender(keys.currentKey.toUpperCase())
                }
              >
                {["male", "female"].map((gender) => (
                  <SelectItem
                    key={gender}
                    value={gender}
                    className="text-[#382a40]"
                  >
                    {gender}
                  </SelectItem>
                ))}
              </Select>
              <Select
                label="Age"
                isDisabled={!edit}
                onSelectionChange={(keys: any) =>
                  setAge(parseInt(keys.currentKey))
                }
              >
                {Array.from({ length: 63 }, (_, index) => index + 18).map(
                  (age) => (
                    <SelectItem
                      key={age}
                      value={userProfile?.age ?? age}
                      className="text-[#382a40]"
                    >
                      {age.toString()}
                    </SelectItem>
                  ),
                )}
              </Select>
              <Select
                label="Personality type"
                isDisabled={!edit}
                onSelectionChange={(keys: any) =>
                  setPersonalityType(keys.currentKey.toUpperCase())
                }
              >
                {["introvert", "extrovert", "ambivert"].map(
                  (personalityType) => (
                    <SelectItem
                      key={personalityType}
                      value={userProfile?.personalityType ?? personalityType}
                      className="text-[#382a40]"
                    >
                      {personalityType}
                    </SelectItem>
                  ),
                )}
              </Select>

              <div className="text-[#a20f0f] font-head mt-2 flex flex-row gap-2">
                <p>About my interests</p>
                <FaHeart className="mt-1" />
              </div>
              <div className="flex flex-col gap-2">
                <p className="font-head text-[#e12323] text-sm flex flex-row gap-2">
                  Speedfire round! Select all your interests!
                </p>
                <Select
                  label="Sports"
                  selectionMode="multiple"
                  isDisabled={!edit}
                  onSelectionChange={(keys: any) => setSportsScore(keys.size)}
                >
                  {[
                    "football",
                    "basketball",
                    "badminton",
                    "tennis",
                    "cycling",
                    "running",
                    "swimming",
                    "volleyball",
                    "golf",
                    "soccer",
                    "martial arts",
                    "none",
                  ].map((sport, index) => (
                    <SelectItem
                      key={sport}
                      value={index}
                      className="text-[#382a40]"
                    >
                      {sport}
                    </SelectItem>
                  ))}
                </Select>
                <Select
                  label="Arts & Entertainment"
                  selectionMode="multiple"
                  isDisabled={!edit}
                  onSelectionChange={(keys: any) =>
                    setArtsEntertainmentScore(keys.size)
                  }
                >
                  {[
                    "painting",
                    "writing",
                    "photography",
                    "film/tv shows",
                    "music",
                    "theater",
                    "dance",
                    "sculpture",
                    "literature",
                    "poetry",
                    "none",
                  ].map((ae, index) => (
                    <SelectItem
                      key={ae}
                      value={index}
                      className="text-[#382a40]"
                    >
                      {ae}
                    </SelectItem>
                  ))}
                </Select>
                <Select
                  label="Outdoor Activities"
                  selectionMode="multiple"
                  isDisabled={!edit}
                  onSelectionChange={(keys: any) =>
                    setOutdoorActivitiesScore(keys.size)
                  }
                >
                  {[
                    "hiking",
                    "camping",
                    "fishing",
                    "gardening",
                    "bird watching",
                    "rock climbing",
                    "nature photography",
                    "backpacking",
                    "stargazing",
                    "none",
                  ].map((outdoorActivity, index) => (
                    <SelectItem
                      key={outdoorActivity}
                      value={index}
                      className="text-[#382a40]"
                    >
                      {outdoorActivity}
                    </SelectItem>
                  ))}
                </Select>
                <Select
                  label="Technology & Gaming"
                  selectionMode="multiple"
                  isDisabled={!edit}
                  onSelectionChange={(keys: any) =>
                    setTechnologyGamingScore(keys.size)
                  }
                >
                  {[
                    "gaming",
                    "coding/programming",
                    "crypto",
                    "virtual reality (VR)",
                    "augmented reality (AR)",
                    "board games",
                    "app development",
                    "cybersecurity",
                    "robotics",
                    "tech gadgets",
                    "artificial intelligence",
                    "none",
                  ].map((tg, index) => (
                    <SelectItem
                      key={tg}
                      value={index}
                      className="text-[#382a40]"
                    >
                      {tg}
                    </SelectItem>
                  ))}
                </Select>
                <Select
                  label="Culinary Arts"
                  selectionMode="multiple"
                  isDisabled={!edit}
                  onSelectionChange={(keys: any) =>
                    setCulinaryArtsScore(keys.size)
                  }
                >
                  {[
                    "cooking",
                    "baking",
                    "wine tasting",
                    "cafe hopping",
                    "grilling/barbecuing",
                    "food photography",
                    "recipe creation",
                    "international cuisine",
                    "healthy eating",
                    "home brewing",
                    "vegan/vegetarian cooking",
                    "none",
                  ].map((culArts, index) => (
                    <SelectItem
                      key={culArts}
                      value={index}
                      className="text-[#382a40]"
                    >
                      {culArts}
                    </SelectItem>
                  ))}
                </Select>
                <Select
                  label="Wellness & Fitness"
                  selectionMode="multiple"
                  isDisabled={!edit}
                  onSelectionChange={(keys: any) =>
                    setWellnessFitnessScore(keys.size)
                  }
                >
                  {[
                    "yoga",
                    "meditation",
                    "crossfit",
                    "weightlifting",
                    "pilates",
                    "nutrition",
                    "zumba",
                    "mindfulness",
                    "none",
                  ].map((wf, index) => (
                    <SelectItem
                      key={wf}
                      value={index}
                      className="text-[#382a40]"
                    >
                      {wf}
                    </SelectItem>
                  ))}
                </Select>
                <Select
                  label="Other Hobbies"
                  selectionMode="multiple"
                  isDisabled={!edit}
                  onSelectionChange={(keys: any) => setOtherHobbies(keys.size)}
                >
                  {[
                    "reading",
                    "singing",
                    "streaming",
                    "journalling",
                    "travelling",
                    "volunteering",
                    "listening to music",
                    "none",
                  ].map((otherHobbies, index) => (
                    <SelectItem
                      key={otherHobbies}
                      value={index}
                      className="text-[#382a40]"
                    >
                      {otherHobbies}
                    </SelectItem>
                  ))}
                </Select>
              </div>
              <div className="text-[#a20f0f] font-head mt-2 flex flex-row gap-2">
                <p>About my preferences</p>
                <FaHeart className="mt-1" />
              </div>

              <Select
                label="Romantic preferences"
                isDisabled={!edit}
                onSelectionChange={(keys: any) =>
                  setGenderPreference(keys.currentKey.toUpperCase())
                }
              >
                {["female", "male", "all"].map((gender, index) => (
                  <SelectItem
                    key={gender}
                    value={index}
                    className="text-[#382a40]"
                  >
                    {gender}
                  </SelectItem>
                ))}
              </Select>
              <Select
                label="Preferred personality type"
                isDisabled={!edit}
                onSelectionChange={(keys: any) =>
                  setSamePersonalityPreference(
                    keys.currentKey == personalityType,
                  )
                }
              >
                {["introvert", "extrovert", "ambivert", "no preference"].map(
                  (personality, index) => (
                    <SelectItem
                      key={personality}
                      value={index}
                      className="text-[#382a40]"
                    >
                      {personality}
                    </SelectItem>
                  ),
                )}
              </Select>
              <Select
                label="I prefer someone with..."
                isDisabled={!edit}
                onSelectionChange={(keys: any) =>
                  setSameMusicTypePreference(parseInt(keys.currentKey))
                }
              >
                {[
                  "no preference",
                  "similar music tastes",
                  "different music tastes",
                ].map((musicTaste, index) => (
                  <SelectItem
                    key={index}
                    value={index}
                    className="text-[#382a40]"
                  >
                    {musicTaste}
                  </SelectItem>
                ))}
              </Select>
              <div className="flex flex-col gap-3">
                <p className="font-head text-[#a20f0f] text-sm mt-2 flex flex-row gap-2">
                  Preferred age range
                </p>
                <div>
                  <Checkbox
                    color="danger"
                    onValueChange={(isSelected) => {
                      if (isSelected) {
                        setMinAgePreference(18);
                        setMaxAgePreference(80);
                      } else {
                        setMinAgePreference(undefined);
                        setMaxAgePreference(undefined);
                      }
                    }}
                    className="font-head text-sm ml-1 text-[#594E60]"
                  >
                    no preferred age range
                  </Checkbox>
                </div>
                <div className="flex flex-row gap-4">
                  <Select
                    label="Minimum"
                    isDisabled={!edit}
                    onSelectionChange={(keys: any) =>
                      setMinAgePreference(parseInt(keys.currentKey))
                    }
                  >
                    {Array.from({ length: 63 }, (_, index) => index + 18).map(
                      (age) => (
                        <SelectItem
                          key={age}
                          value={age}
                          className="text-[#382a40]"
                        >
                          {age.toString()}
                        </SelectItem>
                      ),
                    )}
                  </Select>
                  <p className="mt-2 text-3xl">-</p>
                  <Select
                    label="Maximum"
                    isDisabled={!edit}
                    errorMessage={
                      maxAgePreference &&
                      minAgePreference &&
                      maxAgePreference < minAgePreference
                        ? "Max age cannot be lower than min age"
                        : ""
                    }
                    isInvalid={
                      !!(maxAgePreference && minAgePreference) &&
                      maxAgePreference < minAgePreference
                    }
                    onSelectionChange={(keys: any) =>
                      setMaxAgePreference(parseInt(keys.currentKey))
                    }
                  >
                    {Array.from({ length: 63 }, (_, index) => index + 18).map(
                      (age) => (
                        <SelectItem
                          key={age}
                          value={age}
                          className="text-[#382a40]"
                        >
                          {age.toString()}
                        </SelectItem>
                      ),
                    )}
                  </Select>
                </div>
              </div>

              <Button
                color="primary"
                className="mt-4"
                isDisabled={
                  !(
                    gender &&
                    age &&
                    personalityType &&
                    sportsScore &&
                    artsEntertainmentScore &&
                    outdoorActivitiesScore &&
                    technologyGamingScore &&
                    culinaryArtsScore &&
                    wellnessFitnessScore &&
                    otherHobbies &&
                    genderPreference &&
                    samePersonalityPreference != undefined &&
                    sameMusicTypePreference != undefined &&
                    minAgePreference &&
                    maxAgePreference &&
                    minAgePreference <= maxAgePreference
                  )
                }
                onClick={onSubmit}
                isLoading={loading}
              >
                save
              </Button>
            </>
          )}
        </form>
      </div>
    </>
  ) : (
    <>
      <div className="flex flex-col gap-1 items-center justify-center w-full">
        <Spinner />
      </div>
    </>
  );
}
