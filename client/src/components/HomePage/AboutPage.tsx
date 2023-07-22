import { observer } from "mobx-react-lite";
import React from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Container,
  Header,
  Segment,
  Image,
  Grid,
} from "semantic-ui-react";
import { useStore } from "@/stores/store";
// import LoginForm from '@/components/auth/login/LoginForm';
// import RegsiterForm from '@/components/auth/regsiter/RegsiterForm';

export default observer(function AboutPage() {
  const { userStore, modalStore } = useStore();
  return (
    <div className="aboutWrapper">


    {/* What is Language Exchange? */}
      <Grid
        columns={2}
        container
        stackable
        style={{ paddingTop: "6rem" }}
        className="aboutPage"
        textAlign="center"
      >
        <Grid.Row>
          <Grid.Column width={16}>
            <Header as="h1">What is Language Exchange?</Header>
            <p>The language learning app where people teach each other.</p>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={8}>
            <figure className="imgWrapper">
              <Image src="https://storagelangex.blob.core.windows.net/storeimages/blob-bc8f6b5e-ab18-4548-aec2-e0bcb503dc6b" />
              <caption>
                <strong>Queena</strong> is a native Japanese speaker. She wants
                to work on her English.
              </caption>
            </figure>
          </Grid.Column>
          <Grid.Column width={8}>
            <figure className="imgWrapper">
              <Image src="https://randomuser.me/api/portraits/women/5.jpg" />
              <caption>
                <strong>Lorna</strong> is a native English speaker. She wants to
                improve her Japanese skills.
              </caption>
            </figure>
          </Grid.Column>
        </Grid.Row>
      </Grid>




{/* Queena and Lorna connect on the Language Exchange app … */}
      <Grid
        columns={2}
        container
        stackable
        className="aboutPage"
        textAlign="center"
      >
        <Grid.Row>
          <Grid.Column width={16}>
            <Header as="h1">
              Queena and Lorna connect on the{" "}
              <strong>Language Exchange app</strong> …
            </Header>
            <p>
              …and use Language Exchange's intuitive messaging features and
              language tools to practice their target languages together!
              Queena helps Lorna with Japanese and Lorna helps Queena with
              English.
            </p>
            <div className="gifWrapper">
              <div className="gifCrop translate-messaging"></div>
            </div>
          </Grid.Column>
        </Grid.Row>
      </Grid>


{/* You may know us from… */}
      <Segment
        columns={2}
        container
        stackable
        className="aboutPage youMay"
        textAlign="center"
      >
        <Grid.Row>
          <Grid.Column width={16}>
            <Header as="h1">You may know us from…</Header>
            <figure className="logoImgsWrapper">
              <Image src="https://www.tandem.net/_next/image?url=https%3A%2F%2Fimages.ctfassets.net%2F0uov5tlk8deu%2Fk1pFF5ZO2qf3SeZPO7P1U%2Fa5e6f03750094c32afa1b1a67076fe10%2Fmashable.svg&w=256&q=7" />
              <Image src="https://www.tandem.net/_next/image?url=https%3A%2F%2Fimages.ctfassets.net%2F0uov5tlk8deu%2F7GC6uOr6RceHZUe1f4lAr7%2F2692851681a1d498f39c098f5fe25be0%2Ftech-crunch.svg&w=384&q=75" />
              <Image src="https://www.tandem.net/_next/image?url=https%3A%2F%2Fimages.ctfassets.net%2F0uov5tlk8deu%2F26a2GoWAn0kEgyN7CvhAw9%2Fbb0f1e4de77aa11943e8a6fd76b5e50a%2Flife-hacker.svg&w=360&q=75" />
              <Image src="https://www.tandem.net/_next/image?url=https%3A%2F%2Fimages.ctfassets.net%2F0uov5tlk8deu%2F5AFGCcizZsCO82GRbt400r%2F34a6acc65ba14a0e73993e3a2ab598cf%2Fevening-standard.svg&w=576&q=75" />
              <Image src="https://www.tandem.net/_next/image?url=https%3A%2F%2Fimages.ctfassets.net%2F0uov5tlk8deu%2F7p1lulbR3Oqo3y0MhdZuaw%2F6532f3e0f35dd216832462ca3a783a11%2Finsider.svg&w=360&q=75" />
            </figure>
            <figure className="logoImgsWrapper">
              <Image src="https://www.tandem.net/_next/image?url=https%3A%2F%2Fimages.ctfassets.net%2F0uov5tlk8deu%2F43s8OF5CwbE7He8gEhMxoQ%2F5eaaaa6c26acfb3b0b63548f980e1395%2Fbest-of-app-store-grey__1_.svg&w=767&q=75" />
              <Image src="https://www.tandem.net/_next/image?url=https%3A%2F%2Fimages.ctfassets.net%2F0uov5tlk8deu%2F3QbgWLYl4OGKpISKtRyzF5%2Fa3dff2d0672e4db5351561fe1c46c6d1%2Fbest-of-play-store-grey__1_.svg&w=767&q=75" />
            </figure>
          </Grid.Column>
        </Grid.Row>
      </Segment>



{/* How does Language Exchange work? */}
      <Grid
        columns={2}
        container
        stackable
        className="aboutPage aboutWork"
        textAlign="center"
      >
         <Grid.Row>
          <Grid.Column width={16}>
            <Header as="h1">How does Language Exchange work?</Header>
            <p>Tech Stacks: Typescript, C#, Object-oriented programming (OOP), React, Mobx, ASP.NET, CQRS pattern, SignalR, Entity Framework, Sqlite, PostgreSQL, AutoMapper, Azure Blob Storage, Azure cache for Redis, Responsive Web Design, HTML, CSS, Semantic-UI, Google Map API, OpenCage Geocoding API, MyMemory Translation API, Google OAuth Login, reCAPTCHA, Formik, Yup, and so on ...</p>
          </Grid.Column>
        </Grid.Row>

        <Grid.Row>
          <Grid.Column width={8}>
            <div className="gifWrapper">
              <div className="gifCrop register"></div>
            </div>
          </Grid.Column>
          <Grid.Column width={8} textAlign="left">
            <Header as="h2">0. Join the community</Header>
            <p>Sign up for free. Select languages that can be your mother tongue or want to learn. Set your language level of your learning language. We have a strict validation system to make sure that the community remains safe and fun for everyone.</p>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
        <Grid.Column width={8} textAlign="left">
            <Header as="h2">Or, you can create a new account with Google</Header>
            <p>
              It doesn't give away your password. Skip a little bit of process of signing up. We don't require the exact location that you are currently in, but just city and country.
            </p>
          </Grid.Column>
          <Grid.Column width={8}>
            <div className="gifWrapper">
              <div className="gifCrop google-outh"></div>
            </div>
          </Grid.Column>
        </Grid.Row>
       
        <Grid.Row>
          <Grid.Column width={8}>
            <div className="gifWrapper">
              <div className="gifCrop search-filter"></div>
            </div>
          </Grid.Column>
          <Grid.Column width={8} textAlign="left">
            <Header as="h2">1. Find a partner</Header>
            <p>
            Once you're in, Language Exchange makes it easy to find the right language exchange partner. Search by gender, location, online users, last active, and more. With infinite scrolling and caching to Azure cache for Redis.
            </p>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={8} textAlign="left">
            <Header as="h2">2. Nearby partner with Google Map</Header>
            <p>
            Google Map makes it easier to find a nearby partner. We'll need your current location for this purpose, but we won't collect or store it.
            </p>
          </Grid.Column>
          <Grid.Column width={8}>
            <div className="gifWrapper">
              <div className="gifCrop google-map"></div>
            </div>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={8}>
            <div className="gifWrapper">
              <div className="gifCrop translate-messaging"></div>
            </div>
          </Grid.Column>
          <Grid.Column width={8} textAlign="left">
            <Header as="h2">3. Start talking!</Header>
            <p>
              Pick any way to talk: text, emoji. Translation tool keeps the conversation
              flowing. MyMemory Translation API provides automatic language detection.
            </p>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={8} textAlign="left">
            <Header as="h2">4. Subscribe notifications</Header>
            <p>
              We notify when you've received the message, even if you're not connected to the messages component.
            </p>
          </Grid.Column>
          <Grid.Column width={8}>
            <div className="gifWrapper">
              <div className="gifCrop notification"></div>
            </div>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={8}>
            <div className="gifWrapper">
              <div className="gifCrop upload-img"></div>
            </div>
          </Grid.Column>
          <Grid.Column width={8} textAlign="left">
            <Header as="h2">5. Upload a new profile image</Header>
            <p>
              Add the image into our application and set the first image as a main profile. Images will be stored to Azure Blob Storage.
            </p>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={8} textAlign="left">
            <Header as="h2">6. Change your location</Header>
            <p>
            We offer the flexibility to adjust your location. Don't need to give the exact location that you are currently in, but just city and country will suffice.
            </p>
          </Grid.Column>
          <Grid.Column width={8}>
            <div className="gifWrapper">
              <div className="gifCrop change-location"></div>
            </div>
          </Grid.Column>
        </Grid.Row>


        <Grid.Row>
        <Grid.Column width={8}>
            <div className="gifWrapper">
              <div className="gifCrop change-password"></div>
            </div>
          </Grid.Column>
          <Grid.Column width={8} textAlign="left">
            <Header as="h2">7. Change password</Header>
            <p>
              Why is password changing important? Regularly updating your passwords means that even if someone finds an old or saved password, it will no longer be useful, and your data will be secure.
            </p>

          </Grid.Column>
    
        </Grid.Row>

        <Grid.Row>
          <Grid.Column width={8} textAlign="left">
            <Header as="h2">
              Or, if you joined with Google OAuth, you can still create a new
              password!
            </Header>
            <p>
              Why is password changing important? Regularly updating your passwords means that even if someone finds an old or saved password, it will no longer be useful, and your data will be secure.
            </p>
          </Grid.Column>
          <Grid.Column width={8}>
            <div className="gifWrapper">
              <div className="gifCrop oauth-create-password"></div>
            </div>
          </Grid.Column>
        </Grid.Row>
      </Grid>



      {/* You may know us from… */}
      <div className="findPeopleWrapper">
      <Segment
        columns={2}
        container
        stackable
        style={{ border: 'none', padding: '3rem 0' }}
        className="aboutPage findPeople"
        textAlign="center"
      >
        <Grid.Row>
          <Grid.Column width={16}>
            <Header as="h1">Find your people</Header>
            <p>With Language Exchange, you'll find millions of people sharing the joys and struggles of learning a new language. Join the community and contribute your perspective to the world!</p>
            <Button as={Link} to="/"  big color='teal'>Start learning</Button>
          </Grid.Column>
        </Grid.Row>
      </Segment>
      </div>

      <Segment
        columns={2}
        container
        stackable
        className="aboutPage footer"
        textAlign="center"
      >
        <Grid.Row>
          <Grid.Column width={16}>
            <p>&copy; Shinyoung(Austyn) You - Speak Any Language.</p>
            <p>Language Exchange is licensed by Shinyoung(Austyn) You</p>
          </Grid.Column>
        </Grid.Row>
      </Segment>
    </div>
  );
});
