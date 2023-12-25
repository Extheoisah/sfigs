# SFIGS
SFIGS (Simplified First Issues for Bitcoin Projects) is a platform that curates beginner-friendly tasks within Bitcoin-related open-source projects. It serves as an entry point for developers new to open-source software, allowing them to contribute to well-known Bitcoin projects.

**Primary Languages**:
The SFIGS project primarily utilizes JavaScript, TypeScript, CSS for development tasks.

## Getting Started
1. **Environment Setup**:
   - Begin by copying the environment variables:
```bash
cp .env.sample .env.local
```
 - Populate the `GITHUB_ID` and `GITHUB_SECRET` fields in the `.env.local` file with your OAuth app information from Github. Reference [here](https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/creating-an-oauth-app) for creating an OAuth app.
 
2. **Dependency Installation**:
   - Install project dependencies using yarn:

```bash
yarn install
```

3. **Starting the Development Server**:
   - Initiate the development server using one of the following commands:
     ```

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```
4. **Viewing the Result**:
   - Access the output by opening [http://localhost:3000](http://localhost:3000) in your preferred web browser.
   **Additional Information**:
- **Contributing**:
  
  - Explore available issues categorized as 'Good First Issues' within associated repositories.
  
  - Fork the repository, create a branch, resolve the issue, and submit a pull request (PR).
- **Guidelines**:
  
  - Follow project-specific guidelines, coding standards, and documentation requirements outlined in the          contributing guidelines of each repository.
  
  - Engage with the project community via designated communication channels.
  ## Acknowledgments

  Special thanks to:

- **@exthoisah (https://github.com/Extheoisah)** for initiating and maintaining the SFIGS project, setting a welcoming tone, and fostering collaboration within the community.

We extend our gratitude to all contributors for their valuable contributions, support, and efforts in making SFIGS a vibrant and inclusive space for newcomers.
