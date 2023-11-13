import 'package:flutter/material.dart';
import '../core/app_export.dart';

/// A collection of pre-defined text styles for customizing text appearance,
/// categorized by different font families and weights.
/// Additionally, this class includes extensions on [TextStyle] to easily apply specific font families to text.

class CustomTextStyles {
  // Body text style
  static get bodySmallBlack90002 => theme.textTheme.bodySmall!.copyWith(
        color: appTheme.black90002.withOpacity(0.6),
      );
  // Headline text style
  static get headlineSmallBlack90002 => theme.textTheme.headlineSmall!.copyWith(
        color: appTheme.black90002.withOpacity(0.7),
        fontWeight: FontWeight.w300,
      );
}

extension on TextStyle {
  TextStyle get inter {
    return copyWith(
      fontFamily: 'Inter',
    );
  }
}
