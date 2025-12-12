# Adding Profile Picture to McLarens TransferFlow

## Steps to Add Your Profile Picture

### 1. Add Your Image to Assets Folder

Place your profile picture in the `assets` folder with the name `profile.jpg` (or `profile.png`).

```
McLarens TransferFlow app/
├── assets/
│   ├── profile.jpg  <-- Add your image here
│   ├── favicon.png
│   └── ...
```

### 2. Update AccountScreen.tsx

Open `src/features/auth/screens/AccountScreen.tsx` and find this section (around line 35):

```tsx
<View style={styles.avatar}>
  {/* You can replace User icon with Image component when you add profile picture */}
  {/* <Image source={require('../../../../assets/profile.jpg')} style={styles.avatarImage} /> */}
  <User size={40} color={colors.dark} />
</View>
```

**Replace it with:**

```tsx
<View style={styles.avatar}>
  <Image
    source={require("../../../../assets/profile.jpg")}
    style={styles.avatarImage}
  />
</View>
```

### 3. Supported Image Formats

- `.jpg` / `.jpeg`
- `.png`
- `.webp`

### 4. Recommended Image Specifications

- **Size**: 300x300 pixels or larger (square aspect ratio)
- **File size**: Under 500KB
- **Format**: JPG or PNG

### 5. If Using a Different Filename

If your image has a different name (e.g., `sahan.png`), update the require statement:

```tsx
<Image
  source={require("../../../../assets/sahan.png")}
  style={styles.avatarImage}
/>
```

---

## Current User Information

- **Name**: Sahan
- **Email**: sahanviranga18@gmail.com
- **Role**: Dispatcher

The app will automatically display this information in the Account screen.
