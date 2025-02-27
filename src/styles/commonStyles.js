import { StyleSheet } from "react-native"
import { colors, spacing, fontSizes, borderRadius, shadows } from "./theme"

export const commonStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: spacing.m,
    paddingVertical: spacing.m - 4,
    backgroundColor: colors.white,
    ...shadows.light,
    zIndex: 1,
  },
  headerTitle: {
    fontSize: fontSizes.l,
    fontWeight: "bold",
    color: colors.text,
  },
  screenContent: {
    padding: spacing.m,
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.l,
    padding: spacing.m,
    marginBottom: spacing.m,
    ...shadows.light,
  },
  title: {
    fontSize: fontSizes.xl,
    fontWeight: "bold",
    color: colors.text,
    marginBottom: spacing.m,
  },
  subtitle: {
    fontSize: fontSizes.m,
    color: colors.textLight,
    marginBottom: spacing.l,
  },
  primaryButton: {
    backgroundColor: colors.primary,
    borderRadius: borderRadius.l,
    height: 56,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: spacing.m,
    ...shadows.colored,
  },
  primaryButtonText: {
    color: colors.white,
    fontSize: fontSizes.m,
    fontWeight: "bold",
  },
  secondaryButton: {
    backgroundColor: "transparent",
    borderRadius: borderRadius.l,
    height: 56,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: spacing.s,
  },
  secondaryButtonText: {
    color: colors.primary,
    fontSize: fontSizes.m,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.white,
    borderRadius: borderRadius.l,
    marginBottom: spacing.m,
    paddingHorizontal: spacing.m,
    height: 56,
    ...shadows.light,
  },
  input: {
    flex: 1,
    height: "100%",
    fontSize: fontSizes.m,
    color: colors.text,
  },
  inputIcon: {
    marginRight: spacing.m - 4,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  spaceBetween: {
    justifyContent: "space-between",
  },
  center: {
    justifyContent: "center",
    alignItems: "center",
  },
  floatingButton: {
    position: "absolute",
    bottom: spacing.l,
    right: spacing.l,
    backgroundColor: colors.primary,
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    ...shadows.colored,
  },
})

